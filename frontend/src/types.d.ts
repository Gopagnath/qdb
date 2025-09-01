// For importing JSON files (if you import JSON directly)
declare module '*.json' {
    const value: any;
    export default value;
  }
  
  // For importing image files (png, jpg, jpeg, svg)
  declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpg' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: string;
    export default value;
  }
  
  declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  // Example: Define user data shape returned from API
  export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    avatarUrl?: string;
    // add other fields as needed
  }
  
  // Example: Define post shape
  export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    // add other fields as needed
  }  