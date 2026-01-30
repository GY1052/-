
export type Category = '全部' | 'App界面' | 'Web网页' | 'B端后台' | '可视化大屏' | '品牌视觉' | 'AI作品';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  imageUrl: string;
  details?: {
    background: string;
    thought: string;
    solution: string;
    result: string;
  };
}

export interface Service {
  phase: string;
  outputs: string[];
  duration: string;
  icon: string;
}
