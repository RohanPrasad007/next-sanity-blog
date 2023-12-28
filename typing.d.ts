interface BlogPost {
  _createdAt: string;
  _type: string;
  body: Array<Child>; // Replace 'object' with the actual structure of the body objects if known
  slug: {
    _type: string;
    current: string;
  };
  mainImage: {
    _type: string;
    asset: object; // Replace 'object' with the actual structure of the asset object if known
  };
  _rev: string;
  _id: string;
  title: string;
  _updatedAt: string;
}

type BlogPosts = BlogPost[];

type Child = {
    _type: string;
    style: string;
    _key: string;
    markDefs: Array<any>; 
    children: Array<any>; 
    listItem?: string;
    level?: number;
  };

  interface BlockProps {
    node: {
      style?: string;
      asset?: {
        url: string;
      };
      alt?: string;
      caption?: string;
    };
    children: React.ReactNode;
  }
  
  interface MarkProps {
    children: React.ReactNode;
    mark: {
      href: string;
    };
  }

  declare module '@sanity/block-content-to-react' {
    import React from 'react';
  
    interface BlockContentProps {
      blocks: any;
      serializers?: any;
    }
  
    const BlockContent: React.ComponentType<BlockContentProps>;
    export default BlockContent;
  }
  