import { Store } from "../core/core";
import logoImg from "../../logo.gif";

interface State {
  photo: string;
  name: string;
  email: string;
  blog: string;
  github: string;
  repository: string;
}

export default new Store<State>({
  photo: logoImg,
  name: "Esther/Joy Lee",
  email: "bonjourjj3@gmail.com",
  blog: "coming soon",
  github: "https://github.com/EstherJoyLee",
  repository: "https://github.com/EstherJoyLee/movie-app",
});
