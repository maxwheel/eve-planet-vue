export const planetResources = {
  planet: {
    level: -1,
    type: 'planet',
    name: '星球',
    itesm: [
      {
        name: '风暴'
      }, {
        name: '熔岩'
      }, {
        name: '等离子'
      }, {
        name: '气体'
      }, {
        name: '贫瘠'
      }, {
        name: '海洋'
      }, {
        name: '温和'
      }, {
        name: '冰体'
      }, 
    ]
  },
  p0: {
    level: 0,
    type: 'p0',
    name: '行星原材料',
    items: [
      {
        name: '基础金属',
        fromPlanet: ['贫瘠', '熔岩', '风暴', '等离子', '气体'],
      }, {
        name: '浮游生物群',
        fromPlanet: ['海洋', '冰体'],
      }, {
        name: '自养生物',
        fromPlanet: ['温和'],
      }, {
        name: '非立方晶体',
        fromPlanet: ['等离子', '熔岩'],
      }, {
        name: '悬浮等离子',
        fromPlanet: ['熔岩', '风暴', '等离子'],
      }, {
        name: '离子溶液',
        fromPlanet: ['风暴', '气体'],
      }, {
        name: '微生物',
        fromPlanet: ['冰体', '贫瘠', '海洋', '温和'],
      }, {
        name: '水基液体',
        fromPlanet: ['海洋', '贫瘠', '风暴', '温和', '冰体', '气体'],
      }, {
        name: '重金属',
        fromPlanet: ['熔岩', '等离子', '冰体'],
      }, {
        name: '碳化合物',
        fromPlanet: ['贫瘠', '海洋', '温和'],
      }, {
        name: '长英矿物岩浆',
        fromPlanet: ['熔岩'],
      }, {
        name: '活性气体',
        fromPlanet: ['气体'],
      }, {
        name: '贵金属',
        fromPlanet: ['贫瘠', '等离子'],
      }, {
        name: '复杂有机生命体',
        fromPlanet: ['温和', '海洋'],
      }, {
        name: '稀有气体',
        fromPlanet: ['冰体', '风暴', '气体'],
      },
    ]
  },
  p1: {
    level: 1,
    type: 'p1',
    name: '加工过的行星材料',
    items: [
      {
        name: '生物燃料',
        from: [
          {
            name: '碳化合物'
          }
        ],
      }, {
        name: '细菌',
        from: [
          {
            name: '微生物'
          }
        ],
      }, {
        name: '稀有金属',
        from: [
          {
            name: '贵金属'
          }
        ],
      }, {
        name: '有毒金属',
        from: [
          {
            name: '重金属'
          }
        ],
      }, {
        name: '氧',
        from: [
          {
            name: '稀有气体'
          }
        ],
      }, {
        name: '氧化剂',
        from: [
          {
            name: '活性气体'
          }
        ],
      }, {
        name: '反应金属',
        from: [
          {
            name: '基础金属'
          }
        ],
      }, {
        name: '硅',
        from: [
          {
            name: '长英矿物岩浆'
          }
        ],
      }, {
        name: '电解物',
        from: [
          {
            name: '离子溶液'
          }
        ],
      }, {
        name: '等离子体团',
        from: [
          {
            name: '悬浮等离子'
          }
        ],
      }, {
        name: '水',
        from: [
          {
            name: '水基液体'
          }
        ],
      }, {
        name: '生物质',
        from: [
          {
            name: '浮游生物群'
          }
        ],
      }, {
        name: '蛋白质',
        from: [
          {
            name: '复杂有机生命体'
          }
        ],
      }, {
        name: '工业纤维',
        from: [
          {
            name: '自养生物'
          }
        ],
      }, {
        name: '手性结构',
        from: [
          {
            name: '非立方晶体'
          }
        ],
      }, 
    ]
  },
  p2: {
    level: 2,
    type: 'p2',
    name: '精炼过的行星材料',
    items: [
      {
        name: '核能燃料',
        from: [
          {
            name: '稀有金属'
          }, {
            name: '有毒金属'
          }
        ],
      }, {
        name: '病原体',
        from: [
          {
            name: '细菌'
          }, {
            name: '生物质'
          }
        ],
      }, {
        name: '超张力塑料',
        from: [
          {
            name: '氧'
          }, {
            name: '生物质'
          }
        ],
      }, {
        name: '氧化物',
        from: [
          {
            name: '氧化剂'
          }, {
            name: '氧'
          }
        ],
      }, {
        name: '聚芳酰胺',
        from: [
          {
            name: '氧化剂'
          }, {
            name: '工业纤维'
          }
        ],
      }, {
        name: '生物电池',
        from: [
          {
            name: '生物燃料'
          }, {
            name: '稀有金属'
          }
        ],
      }, {
        name: '纳米体',
        from: [
          {
            name: '细菌'
          }, {
            name: '反应金属'
          }
        ],
      }, {
        name: '建筑模块',
        from: [
          {
            name: '反应金属'
          }, {
            name: '有毒金属'
          }
        ],
      }, {
        name: '合成油',
        from: [
          {
            name: '电解物'
          }, {
            name: '氧'
          }
        ],
      }, {
        name: '合成纺织品',
        from: [
          {
            name: '生物燃料'
          }, {
            name: '工业纤维'
          }
        ],
      }, {
        name: '机械元件',
        from: [
          {
            name: '反应金属'
          }, {
            name: '稀有金属'
          }
        ],
      }, {
        name: '超导体',
        from: [
          {
            name: '等离子体团'
          }, {
            name: '水'
          }
        ],
      }, {
        name: '冷却剂',
        from: [
          {
            name: '电解物'
          }, {
            name: '水'
          }
        ],
      }, {
        name: '硅酸盐玻璃',
        from: [
          {
            name: '氧化剂'
          }, {
            name: '硅'
          }
        ],
      }, {
        name: '微纤维护盾',
        from: [
          {
            name: '工业纤维'
          }, {
            name: '硅'
          }
        ],
      }, {
        name: '微型电子元件',
        from: [
          {
            name: '手性结构'
          }, {
            name: '硅'
          }
        ],
      }, {
        name: '传信器',
        from: [
          {
            name: '等离子体团'
          }, {
            name: '手性结构'
          }
        ],
      }, {
        name: '家畜',
        from: [
          {
            name: '蛋白质'
          }, {
            name: '生物燃料'
          }
        ],
      }, {
        name: '肥料',
        from: [
          {
            name: '细菌'
          }, {
            name: '蛋白质'
          }
        ],
      }, {
        name: '基因肉制品',
        from: [
          {
            name: '蛋白质'
          }, {
            name: '生物质'
          }
        ],
      }, {
        name: '火箭燃料',
        from: [
          {
            name: '等离子体团'
          }, {
            name: '电解物'
          }
        ],
      }, {
        name: '消费级电器',
        from: [
          {
            name: '有毒金属'
          }, {
            name: '手性结构'
          }
        ],
      }, {
        name: '培养基',
        from: [
          {
            name: '细菌'
          }, {
            name: '水'
          }
        ],
      }, {
        name: '水冷CPU',
        from: [
          {
            name: '反应金属'
          }, {
            name: '水'
          }
        ],
      }, 
    ]
  },
  p3: {
    level: 3,
    type: 'p3',
    name: '特殊行星材料',
    items: [
      {
        name: '乌克米超导体',
        from: [
          {
            name: '合成油'
          }, {
            name: '超导体'
          }
        ],
      }, {
        name: '凝缩液',
        from: [
          {
            name: '氧化物'
          }, {
            name: '冷却剂'
          }
        ],
      }, {
        name: '灵巧单元建筑模块',
        from: [
          {
            name: '建筑模块'
          }, {
            name: '微型电子元件'
          }
        ],
      }, {
        name: '生物技术研究报告',
        from: [
          {
            name: '纳米体'
          }, {
            name: '家畜'
          }, {
            name: '建筑模块'
          }
        ],
      }, {
        name: '冷冻保存防腐剂',
        from: [
          {
            name: '培养基'
          }, {
            name: '合成油'
          }, {
            name: '肥料'
          }
        ],
      }, {
        name: '大气内穿梭机',
        from: [
          {
            name: '超张力塑料'
          }, {
            name: '机械元件'
          }, {
            name: '微型电子元件'
          }
        ],
      }, {
        name: '合成神经键',
        from: [
          {
            name: '超张力塑料'
          }, {
            name: '培养基'
          }
        ],
      }, {
        name: '机器人技术',
        from: [
          {
            name: '消费级电器'
          }, {
            name: '机械元件'
          }
        ],
      }, {
        name: '高科技传信器',
        from: [
          {
            name: '聚芳酰胺'
          }, {
            name: '传信器'
          }
        ],
      }, {
        name: '危险物探测系统',
        from: [
          {
            name: '合成纺织品'
          }, {
            name: '病原体'
          }, {
            name: '传信器'
          }
        ],
      }, {
        name: '凝胶基质生物胶',
        from: [
          {
            name: '氧化物'
          }, {
            name: '超导体'
          }, {
            name: '生物电池'
          }
        ],
      }, {
        name: '密封薄膜',
        from: [
          {
            name: '聚芳酰胺'
          }, {
            name: '基因肉制品'
          }
        ],
      }, {
        name: '监控无人机',
        from: [
          {
            name: '硅酸盐玻璃'
          }, {
            name: '火箭燃料'
          }
        ],
      }, {
        name: '制导系统',
        from: [
          {
            name: '水冷CPU'
          }, {
            name: '传信器'
          }
        ],
      }, {
        name: '控制面板',
        from: [
          {
            name: '生物电池'
          }, {
            name: '硅酸盐玻璃'
          }
        ],
      }, {
        name: '疫苗',
        from: [
          {
            name: '家畜'
          }, {
            name: '病原体'
          }
        ],
      }, {
        name: '数据芯片',
        from: [
          {
            name: '超张力塑料'
          }, {
            name: '微纤维护盾'
          }
        ],
      }, {
        name: '核反应堆',
        from: [
          {
            name: '核能燃料'
          }, {
            name: '微纤维护盾'
          }
        ],
      }, {
        name: '工业炸药',
        from: [
          {
            name: '肥料'
          }, {
            name: '合成纺织品'
          }
        ],
      }, {
        name: '超级计算机',
        from: [
          {
            name: '水冷CPU'
          }, {
            name: '冷却剂'
          }, {
            name: '消费级电器'
          }
        ],
      }, {
        name: '透颅微控器',
        from: [
          {
            name: '生物电池'
          }, {
            name: '纳米体'
          }
        ],
      }, 
    ]
  },
  p4: {
    level: 4,
    type: 'p4',
    name: '高级行星材料',
    items: [
      {
        name: '广播节点',
        from: [
          {
            name: '控制面板'
          }, {
            name: '数据芯片'
          }, {
            name: '高科技传信器'
          }
        ],
      }, {
        name: '自协调能源核心',
        from: [
          {
            name: '监控无人机'
          }, {
            name: '核反应堆'
          }, {
            name: '密封薄膜'
          }
        ],
      }, {
        name: '纳米-工厂',
        from: [
          {
            name: '工业炸药'
          }, {
            name: '反应金属'
          }, {
            name: '乌克米超导体'
          }
        ],
      }, {
        name: '反破损快速反应无人机',
        from: [
          {
            name: '凝胶基质生物胶'
          }, {
            name: '危险物探测系统'
          }, {
            name: '大气内穿梭机'
          }
        ],
      }, {
        name: '递推计算模块',
        from: [
          {
            name: '合成神经键'
          }, {
            name: '制导系统'
          }, {
            name: '透颅微控器'
          }
        ],
      }, {
        name: '湿件主机',
        from: [
          {
            name: '超级计算机'
          }, {
            name: '生物技术研究报告'
          }, {
            name: '冷冻保存防腐剂'
          }
        ],
      }, {
        name: '有机砂浆喷注器',
        from: [
          {
            name: '凝缩液'
          }, {
            name: '细菌'
          }, {
            name: '机器人技术'
          }
        ],
      }, {
        name: '无菌管道',
        from: [
          {
            name: '灵巧单元建筑模块'
          }, {
            name: '水'
          }, {
            name: '疫苗'
          }
        ],
      },
    ]
  }
}