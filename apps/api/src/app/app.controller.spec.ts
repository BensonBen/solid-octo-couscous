import { Test, TestingModule } from "@nestjs/testing";
import { Something } from "@solid-octo-couscous/model";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe("getData", () => {
    it('should return "Welcome to api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getAll()).toEqual([
        {
          description: 'I am the first element in the list. WHOA'
        } as Something,
        {
          description: 'I am the second element in the list. WHOA 2'
        } as Something,
      ]);
    });
  });
});
