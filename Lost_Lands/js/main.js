/////////////////HERO//////////////////

function Hero(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "hero");
  this.anchor.set(0.6, 0.6);

  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;

  this.animations.add("stop", [8]);
  this.animations.add("run", [0, 1, 2, 3, 4, 5, 6, 7], 16, true); ////// 16 fps looped
  this.animations.add("jump", [9]);
  this.animations.add("fall", [10]);
  this.animations.add("die", [12, 13, 12, 13, 12, 13, 12, 13], 8);
  this.animations.add("surprise", [12, 11, 11, 11, 11, 11, 11], 8);
  this.animations.play("stop");
}

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.move = function (direction) {
  if (this.isFrozen) {
    return;
  }
  const SPEED = 300;
  this.body.velocity.x = direction * SPEED;

  if (this.body.velocity.x < 0) {
    this.scale.x = -1;
  } else if (this.body.velocity.x > 0) {
    this.scale.x = 1;
  }
};

Hero.prototype.jump = function () {
  const JUMP_SPEED = 400;
  let canJump = this.body.touching.down && this.alive && !this.isFrozen;

  if (canJump || this.isBoosting) {
    this.body.velocity.y = -JUMP_SPEED;
    this.isBoosting = true;
  }

  return canJump;
};

Hero.prototype.stopJumpBoost = function () {
  this.isBoosting = false;
};

/////////////////////////bounce on Spiders///////////////////

Hero.prototype.bounce = function () {
  const BOUNCE_SPEED = 300;
  this.body.velocity.y = -BOUNCE_SPEED;
};

/////////////////////////bounce on Bats//////////////////////

Hero.prototype.bounce_bat = function () {
  const BOUNCE_BAT_SPEED = 500;
  this.body.velocity.y = -BOUNCE_BAT_SPEED;
};

/////////////////////////bounce on Fish//////////////////////

Hero.prototype.bounce_fish = function () {
  const BOUNCE_FISH_SPEED = 680;
  this.body.velocity.y = -BOUNCE_FISH_SPEED;
};

Hero.prototype.update = function () {
  let animationName = this._getAnimationName();
  if (this.animations.name !== animationName) {
    this.animations.play(animationName);
  }
};

Hero.prototype.freeze = function () {
  this.body.enable = false;
  this.isFrozen = true;
};

Hero.prototype.die = function () {
  this.alive = false;
  this.body.enable = false;

  this.animations.play("die").onComplete.addOnce(function () {
    this.kill();
  }, this);
};

Hero.prototype.surprise = function () {
  this.alive = false;
  this.body.enable = false;

  this.animations.play("surprise").onComplete.addOnce(function () {
    this.kill();
  }, this);
};

Hero.prototype._getAnimationName = function () {
  let name = "stop";

  if (!this.alive) {
    name = "die";
  } else if (this.isFrozen) {
    name = "stop";
  } else if (this.body.velocity.y < 0) {
    name = "jump";
  } else if (this.body.velocity.y >= 0 && !this.body.touching.down) {
    name = "fall";
  } else if (this.body.velocity.x !== 0 && this.body.touching.down) {
    name = "run";
  }

  return name;
};

//////////////ENEMY////////////

function Spider(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "spider");

  this.anchor.set(0.5);

  this.animations.add("crawl", [0, 1, 2], 8, true);
  this.animations.add("die", [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
  this.animations.play("crawl");

  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
  this.body.velocity.x = Spider.SPEED;
}

Spider.SPEED = 100;

Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;

Spider.prototype.update = function () {
  if (this.body.touching.right || this.body.blocked.right) {
    this.body.velocity.x = -Spider.SPEED;
  } else if (this.body.touching.left || this.body.blocked.left) {
    this.body.velocity.x = Spider.SPEED;
  }
  if (this.body.velocity.x < 0) {
    this.scale.x = 1;
  } else if (this.body.velocity.x > 0) {
    this.scale.x = -1;
  }
};

Spider.prototype.die = function () {
  this.alive = false;
  this.body.enable = false;

  this.animations.play("die").onComplete.addOnce(function () {
    this.kill();
  }, this);
};

////////////////////ENEMY-GOLD////////////////////////

function Spider_Gold(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "spider_gold");

  this.anchor.set(0.5);

  this.animations.add("crawl", [0, 1, 2], 8, true);
  this.animations.add("die", [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
  this.animations.play("crawl");

  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
  this.body.velocity.x = Spider_Gold.SPEED;
}

Spider_Gold.SPEED = 80;

Spider_Gold.prototype = Object.create(Phaser.Sprite.prototype);
Spider_Gold.prototype.constructor = Spider_Gold;

Spider_Gold.prototype.update = function () {
  if (this.body.touching.right || this.body.blocked.right) {
    this.body.velocity.x = -Spider_Gold.SPEED;
  } else if (this.body.touching.left || this.body.blocked.left) {
    this.body.velocity.x = Spider_Gold.SPEED;
  }
  if (this.body.velocity.x < 0) {
    this.scale.x = 1;
  } else if (this.body.velocity.x > 0) {
    this.scale.x = -1;
  }
};

Spider_Gold.prototype.die = function () {
  this.alive = false;
  this.body.enable = false;

  this.animations.play("die").onComplete.addOnce(function () {
    this.kill();
  }, this);
};

////////////////////ENEMY-BLUE////////////////////////

function Spider_Blue(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "spider_blue");

  this.anchor.set(0.5);

  this.animations.add("crawl", [0, 1, 2], 10, true);
  this.animations.play("crawl");

  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
  this.body.velocity.x = Spider_Blue.SPEED;
}

Spider_Blue.SPEED = 175;

Spider_Blue.prototype = Object.create(Phaser.Sprite.prototype);
Spider_Blue.prototype.constructor = Spider_Blue;

Spider_Blue.prototype.update = function () {
  if (this.body.touching.right || this.body.blocked.right) {
    this.body.velocity.x = -Spider_Blue.SPEED;
  } else if (this.body.touching.left || this.body.blocked.left) {
    this.body.velocity.x = Spider_Blue.SPEED;
  }
  if (this.body.velocity.x < 0) {
    this.scale.x = 1;
  } else if (this.body.velocity.x > 0) {
    this.scale.x = -1;
  }
};

////////////////////////ENEMY-BAT////////////////////////

function Bat(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "bat");

  this.anchor.set(0.5);

  this.animations.add("fly", [0, 1, 2, 3], 8, true);
  this.animations.play("fly");

  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
  this.body.velocity.x = Bat.SPEED;
}

Bat.SPEED = 130;

Bat.prototype = Object.create(Phaser.Sprite.prototype);
Bat.prototype.constructor = Bat;

Bat.prototype.update = function () {
  if (this.body.touching.right || this.body.blocked.right) {
    this.body.velocity.x = -Bat.SPEED;
  } else if (this.body.touching.left || this.body.blocked.left) {
    this.body.velocity.x = Bat.SPEED;
  }

  if (this.body.velocity.x < 0) {
    this.scale.x = 1;
  } else if (this.body.velocity.x > 0) {
    this.scale.x = -1;
  }
};

////////////////////Fish-//////////////////////////////////

function Fish(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "fish");
  this.anchor.set(0.5);

  this.animations.add("jump_from_sea", [0, 1, 2, 3, 4, 5, 6], 8, true);
  this.animations.add("die", [2, 7, 2, 7, 2, 7, 2, 7], 12);
  this.animations.play("jump_from_sea");

  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
}

Fish.prototype = Object.create(Phaser.Sprite.prototype);
Fish.prototype.constructor = Fish;

Fish.prototype.die = function () {
  this.alive = false;
  this.body.enable = false;

  this.animations.play("die").onComplete.addOnce(function () {
    this.kill();
  }, this);
};

///////////////////////// WORM ////////////////////////////////////

function Worm(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "worm");
  this.anchor.set(0.5);

  this.animations.add(
    "out_of_hole",
    [7, 8, 9, 10, 11, 12, 13, 0, 1, 2, 3, 4, 5, 6],
    9,
    true
  );
  this.animations.add("die", [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
  this.animations.play("out_of_hole");

  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
}

Worm.prototype = Object.create(Phaser.Sprite.prototype);
Worm.prototype.constructor = Worm;

/////////////////////////Acid////////////////////////////////////

function Acid(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "acid");
  this.anchor.set(0.5);

  this.animations.add("throw", [0, 1, 2, 1], 8, true);
  this.animations.add("die", [0, 1, 2], 12);
  this.animations.play("throw");

  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
}

Acid.prototype = Object.create(Phaser.Sprite.prototype);
Acid.prototype.constructor = Acid;

Acid.prototype.die = function () {
  this.alive = false;
  this.body.enable = false;

  this.animations.play("die").onComplete.addOnce(function () {
    this.kill();
  }, this);
};

////////////////////Enemy-WAVES//////////////////////////////////

function Wave(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "wave");
  this.anchor.set(0.5);

  this.animations.add(
    "waving",
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    12,
    true
  );

  this.animations.play("waving");

  this.game.physics.enable(this);
  this.body.collideWorldBounds = false;
}

Wave.prototype = Object.create(Phaser.Sprite.prototype);
Wave.prototype.constructor = Wave;

////////////////////Enemy-ACID-LAKE//////////////////////////////////

function Acid_Lake(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "acid_lake");
  this.anchor.set(0.5, 0.5);

  this.animations.add(
    "bubbling",
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    12,
    true
  );

  this.animations.play("bubbling");

  this.game.physics.enable(this);
  this.body.collideWorldBounds = false;
}

Acid_Lake.prototype = Object.create(Phaser.Sprite.prototype);
Acid_Lake.prototype.constructor = Acid_Lake;

//////////////FRIEND -Trans- Spider////////////

function Friend(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "friend");

  this.anchor.set(0.5);

  this.animations.add("stand", [0]);
  this.animations.add("trans", [1, 2, 3, 4, 4, 4, 4, 4], 5);
  this.animations.add("die", [2, 1, 0, 7, 7, 7, 7, 7, 7], 4);
  this.animations.play("stand");

  this.game.physics.enable(this);

  this.body.collideWorldBounds = true;
  this.body.velocity.x = Friend.SPEED;
}

Friend.prototype = Object.create(Phaser.Sprite.prototype);
Friend.prototype.constructor = Friend;

Friend.prototype.trans = function () {
  this.animations.play("trans");
};

Friend.prototype.die = function () {
  this.alive = false;
  this.body.enable = false;

  this.animations.play("die").onComplete.addOnce(function () {
    this.kill();
  }, this);
};

//////////////////////////////////////////////////////////////

//////////////BOSS -Trans- Spider////////////

function Boss(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "boss");

  this.anchor.set(0.5);

  this.animations.add("crawl", [4, 5, 6], 12, true);
  this.animations.add("die", [2, 1, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7], 4);
  this.animations.play("crawl");

  this.game.physics.enable(this);

  this.body.collideWorldBounds = true;
  this.body.velocity.x = Boss.SPEED;
}

Boss.SPEED = 350;

Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.update = function () {
  if (this.body.blocked.right) {
    this.body.velocity.x = -Boss.SPEED;
  } else if (this.body.blocked.left) {
    this.body.velocity.x = Boss.SPEED;
  }
  if (this.body.velocity.x < 0) {
    this.scale.x = 1;
  } else if (this.body.velocity.x > 0) {
    this.scale.x = -1;
  }

  Boss.prototype.bounce_wall = function () {
    const BOUNCE_WALL_SPEED = 200;
    this.body.velocity.y = -BOUNCE_WALL_SPEED;
  };
};

Boss.prototype.die = function () {
  this.alive = false;
  this.body.enable = false;

  this.animations.play("die").onComplete.addOnce(function () {
    this.kill();
  }, this);
};

//////////////////////////////////////////////////////////////

PlayState = {};

const LEVEL_COUNT = 12; ////update everytime when u add a new level

PlayState.init = function (data) {
  this.game.renderer.renderSession.roundPixels = true;

  this.keys = this.game.input.keyboard.addKeys({
    left: Phaser.KeyCode.LEFT,
    right: Phaser.KeyCode.RIGHT,
    up: Phaser.KeyCode.UP,
  });

  this.hasKey = false;
  this.level = (data.level || 0) % LEVEL_COUNT;
};

window.onload = function () {
  let game = new Phaser.Game(960, 600, Phaser.AUTO, "game");

  game.state.add("play", PlayState);
  game.state.start("play", true, false, { level: 7 });
};

PlayState.preload = function () {
  this.game.load.json("level:0", "data/level00.json");
  this.game.load.json("level:1", "data/level01.json");
  this.game.load.json("level:2", "data/level02.json");
  this.game.load.json("level:3", "data/level03.json");
  this.game.load.json("level:4", "data/level04.json");
  this.game.load.json("level:5", "data/level05.json");
  this.game.load.json("level:6", "data/level06.json");
  this.game.load.json("level:7", "data/level07.json");
  this.game.load.json("level:8", "data/level08.json");
  this.game.load.json("level:9", "data/level09.json");
  this.game.load.json("level:10", "data/level10.json");
  this.game.load.json("level:11", "data/level11.json");

  this.game.load.image("background", "images/background.png");

  this.game.load.image("ground", "images/ground.png");
  this.game.load.image("grass:16x1", "images/grass_16x1.png");
  this.game.load.image("grass:12x1", "images/grass_12x1.png");
  this.game.load.image("grass:8x1", "images/grass_8x1.png");
  this.game.load.image("grass:6x1", "images/grass_6x1.png");
  this.game.load.image("grass:4x1", "images/grass_4x1.png");
  this.game.load.image("grass:3x1", "images/grass_3x1.png");
  this.game.load.image("grass:2x1", "images/grass_2x1.png");
  this.game.load.image("grass:1x1", "images/grass_1x1.png");
  this.game.load.image("grass:0.5x1", "images/grass_0.5x1.png");

  this.game.load.image("grass:vertical_12x1", "images/grass_vertical_12x1.png");
  this.game.load.image("grass:vertical_8x1", "images/grass_vertical_8x1.png");
  this.game.load.image("grass:vertical_4x1", "images/grass_vertical_4x1.png");

  this.game.load.image("skull", "images/skull.png");
  this.game.load.image("wood", "images/wood.png");

  this.game.load.image("cloud:3x1", "images/cloud_3x1.png");

  this.game.load.spritesheet("hero", "images/hero.png", 58, 51);
  this.game.load.spritesheet("spider", "images/spider.png", 50, 32);
  this.game.load.spritesheet("spider_gold", "images/spider_gold.png", 50, 32);
  this.game.load.spritesheet("spider_blue", "images/spider_blue.png", 60, 39);
  this.game.load.spritesheet("bat", "images/bat.png", 54, 50);
  this.game.load.spritesheet("friend", "images/friend.png", 81, 60);
  this.game.load.spritesheet("boss", "images/friend.png", 81, 60);

  this.game.load.spritesheet("wave", "images/wave.png", 750, 100);
  this.game.load.spritesheet("acid_lake", "images/acid_lake.png", 192, 155);

  this.game.load.spritesheet("fish", "images/fish.png", 60, 70);
  this.game.load.spritesheet("worm", "images/worm.png", 60, 51);
  this.game.load.spritesheet("acid", "images/acid.png", 30, 26);

  this.game.load.image("invisible-wall", "images/invisible_wall.png");

  this.game.load.spritesheet("cage", "images/cage.png", 80, 222);
  this.game.load.spritesheet("door", "images/door.png", 57, 66);
  this.game.load.image("key", "images/key.png");
  this.game.load.image("not_my_key", "images/key.png");
  this.game.load.spritesheet("icon:key", "images/key_icon.png", 34, 30);

  ///////Sounds////////

  this.game.load.audio("sfx:jump", "audio/jump.wav");
  this.game.load.audio("sfx:stomp", "audio/stomp.wav");
  this.game.load.audio("sfx:enemy_death", "audio/enemy_death.wav");
  this.game.load.audio("sfx:key", "audio/key.wav");
  this.game.load.audio("sfx:door", "audio/door.wav");
  this.game.load.audio("bgm", ["audio/bgm.mp3"]);
};

PlayState.create = function () {
  this.camera.flash("#000000");

  this.game.add.image(0, 0, "background");

  this._loadLevel(this.game.cache.getJSON(`level:${this.level}`));

  this.sfx = {
    jump: this.game.add.audio("sfx:jump"),
    stomp: this.game.add.audio("sfx:stomp"),
    enemy_death: this.game.add.audio("sfx:enemy_death"),
    key: this.game.add.audio("sfx:key"),
    door: this.game.add.audio("sfx:door"),
  };

  this.bgm = this.game.add.audio("bgm");
  this.bgm.loopFull();
  this._createHud();
};

function platformSep(s, platform) {
  if (!s.locked) {
    s.locked = true;
    s.lockedTo = platform;
    s.body.velocity.y = 0;
  }
}

////////////////////////////////FFALLING-PLATFORMS part/////////////////////////////////////////

function fallPlatformSep(s, platform) {
  if (!s.locked) {
    s.lockedTo = platform;
  }

  if (!platform.activated) {
    platform.activated = true;

    var origY = platform.position.y;

    platform.game.time.events.add(
      1000,
      function () {
        var t = platform.game.add.tween(platform.position);
        var dist = platform.game.world.height + 100 - platform.y;
        var time = dist * 2.25;
        t.to(
          { y: platform.position.y + dist },
          time,
          Phaser.Easing.Quadratic.In,
          false,
          0,
          0,
          false
        );
        t.onComplete.add(function () {
          platform.game.time.events.add(1500, function () {
            platform.activated = false;
            platform.position.y = origY;
            var t2 = platform.game.add.tween(platform);
            t2.to(
              { alpha: 0.5 },
              100,
              Phaser.Easing.Linear.None,
              true,
              0,
              3,
              true
            );
          });
        });

        t.start();
      },
      this
    );
  }
}

////////////////////////////////GOUP-PLATFORMS part/////////////////////////////////////////

function goupPlatformSep(s, platform) {
  if (!s.locked) {
    s.lockedTo = platform;
  }

  if (!platform.activated) {
    platform.activated = true;

    var origY = platform.position.y;

    platform.game.time.events.add(
      1000,
      function () {
        var t = platform.game.add.tween(platform.position);
        var dist = platform.game.world.height + 100 - platform.y;
        var time = dist * 2.25;
        t.to(
          { y: platform.position.y - dist },
          time,
          Phaser.Easing.Quadratic.In,
          false,
          0,
          0,
          false
        );
        t.onComplete.add(function () {
          platform.game.time.events.add(1500, function () {
            platform.activated = false;
            platform.position.y = origY;
            var t2 = platform.game.add.tween(platform);
            t2.to(
              { alpha: 0.5 },
              100,
              Phaser.Easing.Linear.None,
              true,
              0,
              3,
              true
            );
          });
        });

        t.start();
      },
      this
    );
  }
}

/////////////////////////////////////////////////////////////////////////

PlayState.update = function () {
  this._handleCollisions();
  this._handleInput();
  this.keyIcon.frame = this.hasKey ? 1 : 0;
};

PlayState.shutdown = function () {
  this.bgm.stop();
};

PlayState._handleCollisions = function () {
  this.game.physics.arcade.collide(this.hero, this.platforms);

  this.game.physics.arcade.collide(
    this.hero,
    this.moving_platforms,
    platformSep,
    null,
    this
  );

  this.game.physics.arcade.collide(
    this.hero,
    this.clouds,
    fallPlatformSep,
    null,
    this
  );

  this.game.physics.arcade.collide(
    this.hero,
    this.cages,
    goupPlatformSep,
    null,
    this
  );

  /////////////////THE PART of carrying hero by platform//////////////

  if (this.hero.locked) {
    if (
      this.hero.body.right < this.hero.lockedTo.body.x ||
      this.hero.body.x > this.hero.lockedTo.body.right
    ) {
      this.hero;
      this.hero.locked = false;
      this.hero.lockedTo = null;
    } else {
      this.hero.x += this.hero.lockedTo.deltaX;
      this.hero.y += this.hero.lockedTo.deltaY;
    }
  }

  this.game.physics.arcade.collide(this.spiders, this.platforms);

  this.game.physics.arcade.collide(this.spiders, this.enemyWalls);

  this.game.physics.arcade.collide(this.spiders, this.clouds);

  this.game.physics.arcade.collide(this.spiders, this.cages);

  this.game.physics.arcade.collide(this.spiders_gold, this.platforms);

  this.game.physics.arcade.collide(this.spiders_gold, this.clouds);

  this.game.physics.arcade.collide(this.spiders_gold, this.enemyWalls);

  this.game.physics.arcade.collide(this.spiders_blue, this.platforms);

  this.game.physics.arcade.collide(this.spiders_blue, this.enemyWalls);

  this.game.physics.arcade.collide(this.spiders_blue, this.cages);

  this.game.physics.arcade.collide(this.spiders_blue, this.clouds);

  this.game.physics.arcade.collide(this.acids, this.spiders_blue);

  this.game.physics.arcade.collide(this.bats, this.platforms);

  this.game.physics.arcade.collide(this.acids, this.platforms);

  this.game.physics.arcade.collide(this.wave, this.enemyWalls);

  this.game.physics.arcade.collide(this.friends, this.platforms);

  this.game.physics.arcade.collide(this.bosses, this.platforms);

  this.game.physics.arcade.collide(this.bosses, this.clouds);

  this.game.physics.arcade.overlap(
    this.hero,
    this.spiders,
    this._onHeroVsEnemy,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.hero,
    this.spiders_gold,
    this._onHeroVsEnemy_Gold,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.hero,
    this.spiders_blue,
    this._onHeroVsEnemy_Blue,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.hero,
    this.bats,
    this._onHeroVsEnemy_Bat,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.hero,
    this.fishes,
    this._onHeroVsFish,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.hero,
    this.worms,
    this._onHeroVsWorm,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.hero,
    this.acids,
    this._onHeroVsAcid,
    null,
    this
  );
  this.game.physics.arcade.overlap(
    this.hero,
    this.waves,
    this._onHeroVsEnemy_Wave,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.hero,
    this.acid_lakes,
    this._onHeroVsAcid_Lake,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.hero,
    this.friends,
    this._onHeroVsFriend,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.hero,
    this.bosses,
    this._onHeroVsBoss,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.hero,
    this.key,
    this._onHeroVsKey,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.hero,
    this.door,
    this._onHeroVsDoor,
    function (hero, door) {
      return this.hasKey && hero.body.touching.down;
    },
    this
  );

  /////////Enemy vs Enemy part//////////////////

  this.game.physics.arcade.overlap(
    this.spiders_blue,
    this.spiders_gold,
    this._onBLueVsGold,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.spiders_gold,
    this.waves,
    this._onSpider_GoldVsWave,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.spiders,
    this.waves,
    this._onSpiderVsWave,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.bosses,
    this.spiders_gold,
    this._onBossVsSpider_Gold,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.bosses,
    this.spiders,
    this._onBossVsSpider,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.bosses,
    this.enemyWalls,
    this._onBossVsWall,
    null,
    this
  );

  this.game.physics.arcade.overlap(
    this.bosses,
    this.worms,
    this._onBossVsWorm,
    null,
    this
  );
};

PlayState._handleInput = function () {
  if (this.keys.left.isDown) {
    this.hero.move(-1);
  } else if (this.keys.right.isDown) {
    this.hero.move(1);
  } else {
    this.hero.move(0);
  }
  const JUMP_HOLD = 200; // ms
  if (this.keys.up.downDuration(JUMP_HOLD)) {
    let didJump = this.hero.jump();
    if (didJump) {
      this.sfx.jump.play();
    }
  } else {
    this.hero.stopJumpBoost();
  }
};

PlayState._onHeroVsEnemy = function (hero, enemy) {
  if (hero.body.velocity.y > 0) {
    hero.bounce();
    enemy.die();
    this.sfx.enemy_death.play();
  } else {
    hero.die();
    this.sfx.stomp.play();
    hero.events.onKilled.addOnce(function () {
      this.game.state.restart(true, false, { level: this.level });
    }, this);
    enemy.body.touching = enemy.body.wasTouching;
  }
};

PlayState._onHeroVsEnemy_Gold = function (hero, enemy) {
  hero.die();
  this.sfx.stomp.play();
  hero.events.onKilled.addOnce(function () {
    this.game.state.restart(true, false, { level: this.level });
  }, this);
  enemy.body.touching = enemy.body.wasTouching;
};

PlayState._onHeroVsEnemy_Blue = function (hero, enemy) {
  hero.die();
  this.sfx.stomp.play();
  hero.events.onKilled.addOnce(function () {
    this.game.state.restart(true, false, { level: this.level });
  }, this);
  enemy.body.touching = enemy.body.wasTouching;
};

///////////////////////////////////////////////////
///////////////////////////////////////////////////

PlayState._onHeroVsFriend = function (hero, friend) {
  friend.trans();
  hero.die();
  this.sfx.enemy_death.play();
  this.sfx.stomp.play();

  hero.events.onKilled.addOnce(function () {
    this.game.state.restart(true, false, { level: this.level + 1 });
  }, this);
  friend.body.touching = friend.body.wasTouching;
};
///////////////////////////////////////////////////

PlayState._onHeroVsBoss = function (hero, boss) {
  hero.die();
  this.sfx.enemy_death.play();
  this.sfx.stomp.play();

  hero.events.onKilled.addOnce(function () {
    this.game.state.restart(true, false, { level: this.level });
  }, this);
  boss.body.touching = hero.body.wasTouching;
};
///////////////////////////////////////////////////

PlayState._onBLueVsGold = function (spider_blue, enemy) {
  enemy.die();
  this.sfx.stomp.play();
  enemy.body.touching = enemy.body.wasTouching;
};

PlayState._onSpider_GoldVsWave = function (spider_gold, enemy) {
  spider_gold.die();
  this.sfx.stomp.play();
  enemy.body.touching = enemy.body.wasTouching;
};

PlayState._onSpiderVsWave = function (spider, enemy) {
  spider.die();
  this.sfx.stomp.play();
  enemy.body.touching = enemy.body.wasTouching;
};

PlayState._onBossVsSpider_Gold = function (boss, enemy) {
  enemy.die();
  this.sfx.stomp.play();
  boss.body.touching = enemy.body.wasTouching;
};

PlayState._onBossVsSpider = function (boss, enemy) {
  enemy.die();
  this.sfx.stomp.play();
  boss.body.touching = enemy.body.wasTouching;
};

PlayState._onBossVsWall = function (boss, enemy) {
  boss.bounce_wall();
  boss.body.touching = enemy.body.wasTouching;
};

PlayState._onBossVsWorm = function (boss, enemy) {
  boss.die();
  boss.body.touching = enemy.body.wasTouching;
};

//////////////////////////////////////////////////

PlayState._onHeroVsEnemy_Bat = function (hero, enemy) {
  if (hero.body.velocity.y > 0) {
    hero.bounce_bat();
    this.sfx.enemy_death.play();
  } else {
    hero.die();
    this.sfx.stomp.play();
    hero.events.onKilled.addOnce(function () {
      this.game.state.restart(true, false, { level: this.level });
    }, this);
    enemy.body.touching = enemy.body.wasTouching;
  }
};

PlayState._onHeroVsFish = function (hero, fish) {
  if (hero.body.velocity.y > 0) {
    hero.bounce_fish();
    fish.die();

    this.sfx.stomp.play();
  }
};

PlayState._onHeroVsWorm = function (hero, enemy) {
  hero.die();
  this.sfx.stomp.play();
  hero.events.onKilled.addOnce(function () {
    this.game.state.restart(true, false, { level: this.level });
  }, this);
  enemy.body.touching = enemy.body.wasTouching;
};

PlayState._onHeroVsAcid = function (hero, enemy) {
  hero.die();
  this.sfx.stomp.play();
  hero.events.onKilled.addOnce(function () {
    this.game.state.restart(true, false, { level: this.level });
  }, this);
  enemy.body.touching = enemy.body.wasTouching;
};

PlayState._onHeroVsEnemy_Wave = function (hero, enemy) {
  hero.die();
  this.sfx.stomp.play();
  hero.events.onKilled.addOnce(function () {
    this.game.state.restart(true, false, { level: this.level });
  }, this);
  enemy.body.touching = enemy.body.wasTouching;
};

PlayState._onHeroVsEnemy_Wave = function (hero, enemy) {
  hero.die();
  this.sfx.stomp.play();
  hero.events.onKilled.addOnce(function () {
    this.game.state.restart(true, false, { level: this.level });
  }, this);
  enemy.body.touching = enemy.body.wasTouching;
};

PlayState._onHeroVsAcid_Lake = function (hero, enemy) {
  hero.die();
  this.sfx.stomp.play();
  hero.events.onKilled.addOnce(function () {
    this.game.state.restart(true, false, { level: this.level });
  }, this);
  enemy.body.touching = enemy.body.wasTouching;
};

PlayState._onHeroVsKey = function (hero, key) {
  this.sfx.key.play();
  key.kill();
  this.hasKey = true;
};

PlayState._onHeroVsDoor = function (hero, door) {
  this.door.animations.play("open_door");
  this.sfx.door.play();
  hero.freeze();
  this.game.add
    .tween(hero)
    .to({ x: this.door.x, alpha: 0 }, 500, null, true)
    .onComplete.addOnce(this._goToNextLevel, this);
};

PlayState._goToNextLevel = function () {
  this.camera.fade("#000000");
  this.camera.onFadeComplete.addOnce(function () {
    // change to next level
    this.game.state.restart(true, false, {
      level: this.level + 1,
    });
  }, this);
};

////////////////////////////////////////////////

PlayState._loadLevel = function (data) {
  this.bgDecoration = this.game.add.group();

  this.platforms = this.game.add.group();

  this.moving_platforms = this.game.add.group();
  this.moving_platforms.enableBody = true;

  this.clouds = this.game.add.group();
  this.clouds.enableBody = true;

  this.cages = this.game.add.group();
  this.cages.enableBody = true;

  this.spiders = this.game.add.group();
  this.spiders_gold = this.game.add.group();
  this.spiders_blue = this.game.add.group();

  this.bats = this.game.add.group();
  this.fishes = this.game.add.group();
  this.worms = this.game.add.group();
  this.acids = this.game.add.group();
  this.waves = this.game.add.group();

  this.enemyWalls = this.game.add.group();
  this.friends = this.game.add.group();
  this.bosses = this.game.add.group();
  this.acid_lakes = this.game.add.group();

  this.enemyWalls.visible = false;

  data.platforms.forEach(this._spawnPlatform, this);
  data.moving_platforms.forEach(this._spawnMoving_Platform, this);

  data.clouds.forEach(this._spawnCloud, this);
  data.cages.forEach(this._spawnCage, this);

  this._spawnCharacters({
    hero: data.hero,
    spiders: data.spiders,
    spiders_gold: data.spiders_gold,
    spiders_blue: data.spiders_blue,
    bats: data.bats,
    fishes: data.fishes,
    worms: data.worms,
    acids: data.acids,
    waves: data.waves,
    acid_lakes: data.acid_lakes,
    friends: data.friends,
    bosses: data.bosses,
  });

  this._spawnDoor(data.door.x, data.door.y);
  this._spawnKey(data.key.x, data.key.y);
  this._spawnNot_My_Key(data.not_my_key.x, data.not_my_key.y);

  const GRAVITY = 1200;
  this.game.physics.arcade.gravity.y = GRAVITY;
};

PlayState._spawnPlatform = function (platform) {
  let sprite = this.platforms.create(platform.x, platform.y, platform.image);

  this.game.physics.enable(sprite);
  sprite.body.allowGravity = false;
  sprite.body.immovable = true;
  //
  this._spawnEnemyWall(platform.x, platform.y, "left");
  this._spawnEnemyWall(platform.x + sprite.width, platform.y, "right");
};

PlayState._spawnMoving_Platform = function (moving_platform) {
  let sprite = this.moving_platforms.create(
    moving_platform.x,
    moving_platform.y,
    moving_platform.image
  );

  this.game.physics.enable(sprite);
  sprite.body.allowGravity = false;
  sprite.body.immovable = true;

  //////////Moving Platform////////////

  this.game.add
    .tween(sprite.position)
    .to(
      { x: sprite.position.x + 520 },
      3500,
      Phaser.Easing.Linear.None,
      true,
      0,
      -1,
      true
    )
    .yoyo(true)
    .loop()
    .start();
};

////////////////////clouds///////////////

PlayState._spawnCloud = function (cloud) {
  let sprite = this.clouds.create(cloud.x, cloud.y, cloud.image);

  this.game.physics.enable(sprite);
  sprite.body.allowGravity = false;
  sprite.body.immovable = true;

  //

  this._spawnEnemyWall(cloud.x, cloud.y, "left");
  this._spawnEnemyWall(cloud.x + sprite.width, cloud.y, "right");
};

/////////////////cage////////////////////

PlayState._spawnCage = function (cage) {
  let sprite = this.cages.create(cage.x, cage.y, cage.image);

  this.game.physics.enable(sprite);
  sprite.body.allowGravity = false;
  sprite.body.immovable = true;

  //

  this._spawnEnemyWall(cage.x, cage.y, "left");
  this._spawnEnemyWall(cage.x + sprite.width, cage.y, "right");
};

PlayState._spawnEnemyWall = function (x, y, side) {
  let sprite = this.enemyWalls.create(x, y, "invisible-wall");

  sprite.anchor.set(side === "left" ? 1 : 0, 1);

  this.game.physics.enable(sprite);
  sprite.body.immovable = true;
  sprite.body.allowGravity = false;
};

PlayState._spawnDoor = function (x, y) {
  this.door = this.bgDecoration.create(x, y, "door");
  this.door.animations.add("open_door", [1, 2, 3, 3, 3, 3, 3], 7, true);
  this.door.anchor.setTo(0.5, 1);
  this.game.physics.enable(this.door);
  this.door.body.allowGravity = false;
};

PlayState._spawnKey = function (x, y) {
  this.key = this.bgDecoration.create(x, y, "key");
  this.key.anchor.set(0.5, 0.5);
  this.game.physics.enable(this.key);
  this.key.body.allowGravity = false;

  //////////up-down animation stuff

  this.key.y -= 3;
  this.game.add
    .tween(this.key)
    .to({ y: this.key.y + 10 }, 800, Phaser.Easing.Sinusoidal.InOut)
    .yoyo(true)
    .loop()
    .start();
};

PlayState._spawnNot_My_Key = function (x, y) {
  this.not_my_key = this.bgDecoration.create(x, y, "not_my_key");
  this.not_my_key.anchor.set(0.5, 0.5);
  this.game.physics.enable(this.not_my_key);
  this.not_my_key.body.allowGravity = false;

  //////////up-down animation stuff

  this.not_my_key.y -= 3;
  this.game.add
    .tween(this.not_my_key)
    .to({ y: this.not_my_key.y + 10 }, 800, Phaser.Easing.Sinusoidal.InOut)
    .yoyo(true)
    .loop()
    .start();
};

PlayState._createHud = function () {
  this.keyIcon = this.game.make.image(0, 19, "icon:key");
  this.keyIcon.anchor.set(0, 0.5);
  this.hud = this.game.add.group();
  this.hud.add(this.keyIcon);
};

////////////////////////////////////

PlayState._spawnCharacters = function (data) {
  // spawn heroo
  this.hero = new Hero(this.game, data.hero.x, data.hero.y);
  this.game.add.existing(this.hero);

  data.spiders.forEach(function (spider) {
    let sprite = new Spider(this.game, spider.x, spider.y);
    this.spiders.add(sprite);
  }, this);

  data.spiders_gold.forEach(function (spider_gold) {
    let sprite = new Spider_Gold(this.game, spider_gold.x, spider_gold.y);
    this.spiders_gold.add(sprite);
  }, this);

  data.spiders_blue.forEach(function (spider_blue) {
    let sprite = new Spider_Blue(this.game, spider_blue.x, spider_blue.y);
    this.spiders_blue.add(sprite);
  }, this);

  data.bats.forEach(function (bat) {
    let sprite = new Bat(this.game, bat.x, bat.y);
    this.bats.add(sprite);
    sprite.body.allowGravity = false;
  }, this);

  data.fishes.forEach(function (fish) {
    let sprite = new Fish(this.game, fish.x, fish.y);
    this.fishes.add(sprite);
    sprite.body.allowGravity = true;

    this.game.add
      .tween(sprite.position)
      .to(
        { y: sprite.position.y - 520 },
        1500,
        Phaser.Easing.Sinusoidal.InOut,
        0,
        -1,
        true
      )
      .yoyo(true)
      .loop()
      .start();
  }, this);

  data.worms.forEach(function (worm) {
    let sprite = new Worm(this.game, worm.x, worm.y);
    this.worms.add(sprite);
    sprite.body.allowGravity = false;
  }, this);

  data.acids.forEach(function (acid) {
    let sprite = new Acid(this.game, acid.x, acid.y);
    this.acids.add(sprite);
    sprite.body.allowGravity = false;

    this.game.add
      .tween(sprite.position)
      .to(
        { x: sprite.position.x + 730 },
        1550,
        Phaser.Easing.Linear.None,
        0,
        -1,
        true
      )

      .loop()
      .start();
  }, this);

  data.waves.forEach(function (wave) {
    let sprite = new Wave(this.game, wave.x, wave.y);
    this.waves.add(sprite);
    sprite.body.allowGravity = false;
  }, this);

  data.acid_lakes.forEach(function (acid_lake) {
    let sprite = new Acid_Lake(this.game, acid_lake.x, acid_lake.y);
    this.acid_lakes.add(sprite);
    sprite.body.allowGravity = false;
  }, this);

  data.friends.forEach(function (friend) {
    let sprite = new Friend(this.game, friend.x, friend.y);
    this.friends.add(sprite);
    sprite.body.allowGravity = true;
  }, this);

  data.bosses.forEach(function (boss) {
    let sprite = new Boss(this.game, boss.x, boss.y);
    this.bosses.add(sprite);
    sprite.body.allowGravity = true;
  }, this);
};