// const cohere = require('cohere-ai');
// cohere.init('3uz5hHxR0kEyNYl8CvNWixc0qQACtSXvoxw1o4ZC');
//
// (async () => {
//     const response = await cohere.generate({
//         prompt: 'Create a single simple ice breaker question that is relevant to ice skating and fashion.',
//         max_tokens: 100,
//         temperature: 0.25
//
//     });
//     console.log(`Prediction: ${response.body.generations[0].text}`);
// })();



const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);
(async () => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Create a single simple icebreaker question for two people given their interests."+
            "The two people do not know each other's interests, so try to create an icebreaker that is relevant to at least one topic and at most two topics from each person's interests."+
            "The icebreaker should be relevant to both people's interests and the question should combine their interests in some way." +
            "Person 1\'s interests are Chess. Person 2\'s interests are Breaking Bad.",
        // prompt: "Given a list of two people's interests, first determine if they have any interests in common."+
        //     "If they have interests in common, pick one of the common interest at random and create a single simple ice breaker question on that interest."+
        //     "If the persons do not share any common interests, make a random single simple ice breaker question."+
        //     "Person 1\'s interests are hockey, guitar, programming" +
        //     "Person 2\'s interests are chess, video games, baseball",
        max_tokens: 100,
        temperature: 0,
    });
    console.log(response.data.choices[0].text)
})();
