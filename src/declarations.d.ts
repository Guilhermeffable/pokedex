declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare namespace NodeJS {
  interface Global {
    mockPokemon: any; // Replace `any` with the appropriate type if known
  }
}

declare const global: NodeJS.Global;
