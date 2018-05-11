##  用递归的方式实现级联组件
> npm start
### 主要思考的问题
> 注意：我没有使用self方法，我只是提供了自己的简介

[demo](https://volankey.github.io/SAN-LEARN/cascader)


怎么将这样的数据进行合理的解析，然后可以展现在视图上

原数据

```
 [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }]
```
解析后

```
    [
    //第一级别
	[{
		"value": "zhinan",
		"label": "指南",
		"children": [{
			"value": "shejiyuanze",
			"label": "设计原则",
			"children": [{
				"value": "yizhi",
				"label": "一致",
				"selected": true
			}, {
				"value": "fankui",
				"label": "反馈",
				"selected": false
			}, {
				"value": "xiaolv",
				"label": "效率",
				"selected": false
			}, {
				"value": "kekong",
				"label": "可控",
				"selected": false
			}],
			"selected": true
		}, {
			"value": "daohang",
			"label": "导航",
			"children": [{
				"value": "cexiangdaohang",
				"label": "侧向导航"
			}, {
				"value": "dingbudaohang",
				"label": "顶部导航"
			}],
			"selected": false
		}],
		"selected": true
	}, {
		"value": "ziyuan",
		"label": "资源",
		"children": [{
			"value": "axure",
			"label": "Axure Components"
		}, {
			"value": "sketch",
			"label": "Sketch Templates"
		}, {
			"value": "jiaohu",
			"label": "组件交互文档"
		}],
		"selected": false
	}],
	//第二级别
	[{
		"value": "shejiyuanze",
		"label": "设计原则",
		"children": [{
			"value": "yizhi",
			"label": "一致",
			"selected": true
		}, {
			"value": "fankui",
			"label": "反馈",
			"selected": false
		}, {
			"value": "xiaolv",
			"label": "效率",
			"selected": false
		}, {
			"value": "kekong",
			"label": "可控",
			"selected": false
		}],
		"selected": true
	}, {
		"value": "daohang",
		"label": "导航",
		"children": [{
			"value": "cexiangdaohang",
			"label": "侧向导航"
		}, {
			"value": "dingbudaohang",
			"label": "顶部导航"
		}],
		"selected": false
	}],
	//第三级别
	[{
		"value": "yizhi",
		"label": "一致",
		"selected": true
	}, {
		"value": "fankui",
		"label": "反馈",
		"selected": false
	}, {
		"value": "xiaolv",
		"label": "效率",
		"selected": false
	}, {
		"value": "kekong",
		"label": "可控",
		"selected": false
	}]
]
```

按照如上格式就可以进行对应模板展示

```
<template> 
   <div className="cascader-menu" >
        <ul s-for="options,index in activeOptions">
            <li className="{{option.selected==true?'active':''}}" s-for="option in options" on-click="handleClick(index,option)">
                {{option.label}}
            </li>
        </ul>
   </div>
</template>
```
对应的初始化data

```
//初始化data
        initData: function () {
          
            return {
                //选中的值数据
                activeValue:[],
                //展示的选项数据
                activeOptions:[[]]
            }

        }
```

数据解析函数

```
 let new_option = [];
            let activeValue = this.data.get("activeValue");
    
             //生成要显示的数据格式 参数:options 级别level
            const makeData=(options,level=0)=>{

                    for(var i = 0 ,max = options.length; i < max ; i++){
                        if(!new_option[level]){
                            new_option[level]=[];
                            
                        }
                        new_option[level].push(options[i]);
                        
                       
                        //递归 判断是否是选中的值才能进行递归
                        if(options[i].value==activeValue[level]){
                            options[i].selected = true;
                            //判断是否有子元素才可以递归
                            //如果不是 那么我们触发change
                            options[i].children? makeData(options[i].children,level+1):this.handleChanged();
                        }
                        else{
                            options[i].selected = false;
                        }
                    }
                    
            }

            makeData(options);
```
### 其次思考的问题
如何通知父级元素返回给值给父级组件
这里我们利用==san提供的dispatch==

子组件内（在handleData触发）
```
  handleChanged:function(){
             // 向组件树的上层派发消息告诉父级组件选好了值了
             
            this.dispatch('Values:changed',{
                acv:this.data.get("activeValue"),
                acvl:this.acvl
            } );
        },
```
父组件内接收这个消息

```
 messages: {
            'Values:changed': function (arg) {
                var value = arg.value;
                this.handleChanged(value);

                // arg.target 可以拿到派发消息的组件
            }
        },
```
### 剩下的应该没什么难点了



