export interface Script {
  id: string;
  type: "story" | "traffic";
  isCreepy: boolean;
  title: string;
  text: string;
}
