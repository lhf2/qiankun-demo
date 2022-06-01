# qiankun
1. 如何在主应用的某个路由页面加载微应用？主应用的children下；

    ```JavaScript
    const routes = [
    {
        path: '/',
        component: Home,
        redirect: '/app',
        children: [
        { path: '/app', component: Content },
        { path: '/vue/', component: Empty}
        ]
    },
    // 一定要写这个，防止刷新的时候子应用不加载
    {
        path: '/*',
        component: Home
    },
    ];

    ```

    main.js的时候无需在启动，到指定页面的时候在启动；

    ```Vue
    <template>
        <div class="app-nav">
            <div>
            <router-link to="/app">主应用</router-link>
            </div>
            <div>
            <router-link to="/vue">子应用</router-link>
            </div>
        </div>
    </template>

    <script>
    import { start } from "qiankun";
    import { onMounted } from "vue";

    export default {
    setup() {
        onMounted(() => {
        if (!window.qiankunStarted) {
            window.qiankunStarted = true;
            start();
        }
        });
    },
    };
    </script>
    ```
2. 主子应用之间的样式隔离、同一命名的组件隔离？

    样式隔离：原理是使用的shadow dom；

    ```JavaScript
    sandbox: { strictStyleIsolation: true }
    ```

    同一名称的组件隔离：

    ```JavaScript
    // 根据运行环境是否是qiankun下，动态导入组件
    import isQiankun from "../main";
    import { defineAsyncComponent } from "vue";
    export default {
    name: "Home",
    components: {
        HeaderComponent: !isQiankun ? defineAsyncComponent(() =>
        import("../common/header.vue")
        ) : '',
        FooterComponent: !isQiankun ? defineAsyncComponent(() =>
        import("../common/footer.vue")
        ) : '',
        Nav: !isQiankun ? defineAsyncComponent(() =>
        import("../common/nav.vue")
        ) : ''
    },
    setup() {
        return {
        isQiankun,
        };
    },
    };
    ```
3. 如何从子应用返回主应用？

    如果子应用在qiankun的环境下要返回的话，可以使用如下两种方式：

    ```JavaScript
    1.把父组件的router传到子组件中；子组件在mounted的时候给window上赋值；
    window.rootRouter = props.router;
    window.rootRouter.push('/')
    
    2.直接使用浏览器的api  
        window.history.pushState('', '', '/')
    ```

    如果子应用不在qiankun环境下，使用`localhost.href`进行跳转；
4. 主子应用之间的数据通信？
    - 可以通过`props`传递；
    - 可以在主应用通过 `initGlobalState` 定义全局状态；通过props传给子应用；
5. 主子应用如何共享第三方组件库以及自己封装的组件？
    - 第三方组件库：externals

    ```JavaScript
    // 主、子应用都配置 externals，引入外链地址；子应用开启ignore；
    // （但如果主应用开启了样式隔离，子应用开启ignore是有问题的，在主应用中加载的时候不能正确展示样式)

    externals: {
        'vue': 'Vue',
        'element-plus': 'ElementPlus'
    }
    
    // 主应用需要去掉ignore
    <link ignore rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css">
    <script ignore src="//unpkg.com/vue@next"></script>
    <script ignore src="//unpkg.com/element-plus"></script>
    
    // 引入使用
    import ElementPlus from 'element-plus'
    instance.use(ElementPlus);

    ```
    - 自己封装的组件跟方法：props、webpack5 Module Federation;

        props：可以在父应用使用install注册一个插件（注册所有需要导出的组件），通过props传给子；

        ```JavaScript
        // shareComponent.js, 主应用中的共享组件管理插件
        import SideBar from '../components/sideBar' //自定义公共组件
        import TopBar from '../components/topBar' //自定义公共组件

        const shareComponents = [SideBar, TopBar]; // 需要共享给子应用的组件
        //vue插件的install方法
        const install = function (Vue) {
        shareComponents.forEach(component => {
            Vue.component(component.name, component); //注册为Vue全局组件
        });
        };

        export default {
        install,
        };

        // 主应用中的入口文件
        import shareComponent from '../src/utils/shareComponent.js'

        ...
        {
            name: 'xxx'
            entry: 'xxx',
            container: '#xxx',
            activeRule: 'xxx',
            props: {
                shareComponent
            }
        },
        ...

        // 子应用入口文件
        ...
        export async function mount(props) {
        console.log('[vue] props from main framework', props);
        Vue.use(props.shareComponent)
        }
        ...

        // 子应用的一个组件中
        <template>
            <TopBar></TopBar>
        </template>

        ```

        webpack5 Module Federation

        ```JavaScript
        // 需要导出的文件
        new ModuleFederationPlugin({
            name: 'root_app',
            filename: "root_app.js",
            exposes: {
                './commonExport': './commonExport'
            }
            })

        // 引入
        new ModuleFederationPlugin({
            name: 'vue_app',
            filename: "vue_app.js",
            remotes: {
                rootApp: 'root_app@http://localhost:8080/root_app.js'
            }
        })
        // 使用
        import { HeaderComponent, utils } from "rootApp/commonExport";

        ```
6. 部署？

    主应用和子应用可以部署在同一个服务器下，通过目录层级进行区分；主应用部署在一级目录，微应用部署在二/三级目录。微应用 必须配置 `webpack` 构建时的 `publicPath` 为**目录名称**；`history` 路由的微应用需要设置 `base` ，值为**目录名称**；

    也可以部署在不同的服务器上，这时主应用的就需要通过nginx做一次反向代理，把指向子应用的访问路径转发到子应用的服务入口。例如，主应用在 A 服务器，微应用在 B 服务器，使用路径 `/app1` 来区分微应用，即 A 服务器上所有 `/app1` 开头的请求都转发到 B 服务器上。