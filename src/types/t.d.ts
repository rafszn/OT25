export type AppRoute = {
  path?: string;
  element: React.FC;
  protected?: boolean;
  public?: boolean;
  children?: AppRoute[];
  index?: boolean;
};
