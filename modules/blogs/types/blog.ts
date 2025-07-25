export interface BlogItemType {
    id: number;
    date: string;
    slug: string;
    acf: {
        time_read: string;        
        image_alt_bp?:string;
        image_title_bp?:string;
        image_url_bp?:string;
    };
    categories: [
      number  
    ];
    categories_names: [
        string
    ];
    excerpt: {
        rendered: string
    }
    title: {
        rendered: string;
    };
    images?: {
        medium?: string;
        large?: string;
    };

    tags?: number[];
    tags_names?: string[];
    content?:{
        rendered?: string;
    };
    time_read?: string;

}

export interface CityItemType {
    images: {
        medium: string;
        large: string;
    };
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string
    }
}

export interface HomeCategoryItemType {
    images: {
        medium: string;
        large: string;
    };
    title: {
        rendered: string;
    };
    slug: string;
    categories: [
        string
    ]
}

export interface CategoriesNameType{
    name: string;
    id:number
}