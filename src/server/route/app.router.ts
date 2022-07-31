import { createRouter } from "../createRouter";

import { bikesRouter } from "./bikes.router";

export const appRouter = createRouter()
  .merge('bikes.', bikesRouter);

export type AppRouter = typeof appRouter;