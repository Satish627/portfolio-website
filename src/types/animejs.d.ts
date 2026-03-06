declare module "animejs" {
  interface AnimeInstance {
    pause: () => void;
  }

  interface AnimeStatic {
    (params: Record<string, unknown>): AnimeInstance;
    remove: (targets: unknown) => void;
    stagger: (value: number) => (element: Element, index: number, length: number) => number;
  }

  const anime: AnimeStatic;
  export default anime;
}
