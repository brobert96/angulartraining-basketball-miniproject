import { Team, GameResults } from "../../models";

export interface RawTeams{
    data: Team[];
}

export interface RawGames{
    data: GameResults[];
}