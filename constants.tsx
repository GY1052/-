
import { PortfolioItem, Service } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'project-01',
    title: '翼党建',
    description: '智慧党建云平台，通过数字化手段提升基层党组织管理效率。',
    category: 'App界面',
    imageUrl: 'public/翼党建.png',
    details: {
      background: '传统党建工作存在流程繁琐、数据统计难、互动性差等痛点。',
      thought: '采用严谨的“党建红”作为主色调，结合扁平化图标设计。',
      solution: '设计了三会一课在线预约、积分商城、党费缴纳等模块。',
      result: '系统上线后ssjjjj党员参与度提升了40%。'
    }
  },
  {
    id: 'project-02',
    title: '贵阳荟康医院',
    description: '一站式医疗服务管理系统，优化患者就医流程与科室协作。',
    category: 'B端后台',
    imageUrl: 'public/贵阳荟康医院.png',
    details: {
      background: '医疗机构内部系统陈旧，患者挂号排队时间长。',
      thought: '以医疗蓝为核心视觉，强调安全与高效。',
      solution: '重构了门诊工作站UI，引入可视化排班表。',
      result: '平均接诊效率提升25%。'
    }
  },
  {
    id: 'project-03',
    title: '环保大数据大屏',
    description: '实时环保监测可视化大屏，科技感与数据之美的结合。',
    category: '可视化大屏',
    imageUrl: 'public/贵阳荟康医院1111.png',
    details: {
      background: '需要向监管部门直观展示全城的空气、水质实时监测数据。',
      thought: '采用深蓝色调背景配合荧光色数据点阵。',
      solution: '运用 3D 地图组件展示区域污染分布。',
      result: '获得省级环保展示项目一等奖。'
    }
  },
  {
    id: 'project-04',
    title: '智慧社区App',
    description: '集成物业服务、邻里社交、智能家居控制的社区生活助手。',
    category: 'App界面',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop',
    details: {
      background: '社区服务碎片化，居民与物业沟通成本高。',
      thought: '使用柔和的色调，营造温馨的社区氛围。',
      solution: '开发了一键报修、访客通行码等便捷功能。',
      result: '覆盖300+社区，日活用户增长30%。'
    }
  },
  {
    id: 'project-05',
    title: 'FinTech金融理财',
    description: '专业级资产管理与理财分析平台，专注资产配置优化。',
    category: 'Web网页',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
    details: {
      background: '金融分析工具过于复杂，普通投资者难以理解。',
      thought: '通过大量的可视化图表简化复杂数据。',
      solution: '设计了智能投顾系统界面与实时收益分析看板。',
      result: '用户投资成功率提升15%。'
    }
  },
  {
    id: 'project-06',
    title: '物流管理中枢',
    description: '针对复杂供应链的物流调度系统，支持全国范围运输追踪。',
    category: 'B端后台',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop',
    details: {
      background: '传统物流追踪滞后，调度效率低下。',
      thought: '强调数据层级与操作效率，减少视觉干扰。',
      solution: '开发了动态路径优化算法的展示界面。',
      result: '运输成本降低12%，调度效率提升20%。'
    }
  },
  {
    id: 'project-07',
    title: '新能源充电站大屏',
    description: '实时监控全国充电桩运行状态与电力负荷分析。',
    category: '可视化大屏',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop',
    details: {
      background: '新能源车主充电难，场站运维压力大。',
      thought: '高对比度色彩方案，确保在各种光线下清晰易读。',
      solution: '实时热力图展示充电高峰区域。',
      result: '故障响应速度提升50%。'
    }
  },
  {
    id: 'project-08',
    title: '极简极光品牌视觉',
    description: '为高端科技初创公司打造的品牌形象设计。',
    category: '品牌视觉',
    imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&auto=format&fit=crop',
    details: {
      background: '初创公司需要一个能够体现创新精神的品牌形象。',
      thought: '灵感来源于北极光，象征无限可能与未来感。',
      solution: '设计了完整的视觉识别系统（VI）。',
      result: '助力客户获得A轮融资。'
    }
  },
  {
    id: 'project-09',
    title: 'AI 虚拟社交空间',
    description: '结合生成式AI的元宇宙社交界面，体验未来生活。',
    category: 'AI作品',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    details: {
      background: '探索AI如何改变人与人的社交方式。',
      thought: '流动性的界面设计，打破传统网格限制。',
      solution: '集成AI实时对话翻译与头像生成界面。',
      result: '概念作品在Behance获得广泛关注。'
    }
  },
  {
    id: 'project-10',
    title: '工业4.0智造监控',
    description: '全自动生产线实时参数监控与故障预警系统。',
    category: 'B端后台',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop',
    details: {
      background: '工厂生产数据孤岛化，故障无法提前预知。',
      thought: '暗色系工业风格，减少长期操作的视觉疲劳。',
      solution: '引入数字孪生技术的交互界面。',
      result: '非计划停机时间减少35%。'
    }
  },
  {
    id: 'project-11',
    title: '健康追踪可穿戴UI',
    description: '适配各种智能手表的极简健康监测界面。',
    category: 'App界面',
    imageUrl: 'https://images.unsplash.com/photo-1544117518-30dd5ff7a9bd?w=800&auto=format&fit=crop',
    details: {
      background: '运动健康数据展示过于枯燥。',
      thought: '模块化卡片设计，支持快速触达核心指标。',
      solution: '重新设计了心率、睡眠、压力等核心模块。',
      result: '用户留存率提升20%。'
    }
  }
];

export const SERVICES: Service[] = [
  {
    phase: '策略分析',
    outputs: ['用户画像挖掘', '竞品差异化研究', '产品逻辑梳理'],
    duration: '1-2 周',
    icon: 'Search'
  },
  {
    phase: '界面设计',
    outputs: ['高保真原型', '视觉设计稿', '核心动效演示'],
    duration: '3-4 周',
    icon: 'PenTool'
  },
  {
    phase: '设计交付',
    outputs: ['设计规范文档', '切图标注包', '上线视觉走查'],
    duration: '1 周',
    icon: 'CheckCircle2'
  }
];
