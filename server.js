"use strict";

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');
let askJoke = false;
express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/bot-message", (req, res) => {
    const randomTime = Math.floor(Math.random() * 3000);
    const commonGreetings = [
      "hi",
      "hello",
      "howdy",
      "bonjour",
      "good morning",
      "guten tag",
      "buenos dias",
    ];

    const commonGoodbyes = [
      "bye",
      "goodbye",
      "see ya",
      "ciao",
      "TTYL",
      "salut",
      "Auf Wiedersehen",
    ];

    const funnyJokes = [
      { setup: "How do robots eat guacamole?", punchline: "With microchips!" },
      {
        setup: "Why do robots have summer holidays?",
        punchline: "To recharge their batteries.",
      },
      {
        setup: "What is a robot’s favourite genre of music?",
        punchline: "Heavy metal.",
      },
      {
        setup: "Why did the robot go back to school?",
        punchline: "They were getting a bit rusty",
      },
      {
        setup: "What sort of robot turns into a tractor?",
        punchline: "A transfarmer",
      },
      {
        setup: "Why did the robots cross the road?",
        punchline: "Because they were programmed to do it.",
      },
      {
        setup: "What does R2D2 use to open PDF files? ",
        punchline: "Adobe Wan Kenobi.",
      },
      {
        setup: "Why was the robot bankrupt?",
        punchline: "They had used all their cache.",
      },
      {
        setup: "Why is a robot mechanic never lonely?",
        punchline: "Because they're always making new friends.",
      },
      { setup: "What do you call a pirate robot? ", punchline: "Arrrrr2D2." },
    ];

    const getBotMessage = (text) => {
      let botMsg = text;
      let randomTime = Math.floor(Math.random() * 3000);
      let containsGreeting = false;
      let containsGoodbye = false;

      commonGreetings.forEach((greeting) => {
        if (text.toLowerCase().includes(greeting)) {
          containsGreeting = true;
        }
      });

      commonGoodbyes.forEach((greeting) => {
        if (text.toLowerCase().includes(greeting)) {
          containsGoodbye = true;
        }
      });

      if (text.toLowerCase().includes("something funny")) {
        askJoke = true;
        return (botMsg = "Bzzt Would you like to hear a joke? (Y/N)");
      } else if (
        (text.toLowerCase() != "y" || text.toLowerCase() != "yes") && // I did this intentionally - I want the robot to respond "goodbye" if the answer is anything but yes.
        askJoke
      ) {
        console.log(askJoke);
        askJoke = false;
        botMsg = "Goodbye!";
      } else if (containsGreeting) {
        botMsg = "Hello!";
      } else if (containsGoodbye) {
        botMsg = "Goodbye!";
      }

      askJoke = false;
      return botMsg;
    };

    const tellAJoke = () => {
      const randomI = Math.floor(Math.random() * funnyJokes.length);
      const randomTime = Math.floor(Math.random() * 3000);
      const message = {
        author: "bot",
        text: funnyJokes[randomI].setup,
        punchline: funnyJokes[randomI].punchline,
      };

      return message;
    };

    setTimeout(() => {
      if (
        askJoke &&
        (req.query.text.toLowerCase() === "y" ||
          req.query.text.toLowerCase() === "yes")
      ) {
        askJoke = false;
        const joke = tellAJoke();
        console.log(joke);
        const message = { author: "bot", text: joke.text };
        const message2 = { author: "bot", text: joke.punchline };
        res.status(200).json({ status: 200, message, message2 });
      } else {
        const message = {
          author: "bot",
          text: `Bzzt ${getBotMessage(req.query.text)}`,
        };
        res.status(200).json({ status: 200, message });
      }
    }, randomTime);
  })

  ////////

  .get("/parrot-message", (req, res) => {
    const randomTime = Math.floor(Math.random() * 3000);

    setTimeout(() => {
      const message = { author: "parrot", text: req.query.text };
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/cat-message", (req, res) => {
    const randomTime = Math.floor(Math.random() * 3000);

    setTimeout(() => {
      const message = { author: "cat", text: "Meow" };
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const randomTime = Math.floor(Math.random() * 3000);
    const messages = [
      "Don't monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩  at you!",
      "🐒🐒🐒🐒",
      "🙈",
      "🙊",
      "🙉",
      "Got any monkey treats? 🍌🎃",
      "Talk to my agent 📱 🎥",
      "I see dead people 👻",
      "Eeeeeeeeeeeeeeeee!",
    ];
    const randomI = Math.floor(Math.random() * messages.length);

    setTimeout(() => {
      const message = { author: "monkey", text: messages[randomI] };
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
