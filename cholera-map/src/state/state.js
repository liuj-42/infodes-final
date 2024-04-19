import {atom} from "jotai";

import outbreaks from "../../public/outbreaks.json";

export const outbreakAtom = atom(outbreaks["outbreaks"]);