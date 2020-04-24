import {Quiz} from '../models/quiz.model';
import {Question} from '../models/question.model';

export const QUESTION_ACTOR: Question = {
  id: '1',
  statement: 'Jean Gabin a joué dans...',
  answers: [
    {
      statement: 'Les tuches II',
      valid: false,
    },
    {
      statement: 'La grande illusion',
      valid: true,
    }
  ]
};


export const QUESTION_ACTORS: Question = {
  id: '1',
  statement: 'Jean Gabin a jousfsdfsdfsé dans...',
  answers: [
    {
      statement: 'Les tuches sfsdfsdfsdfII',
      valid: false,
    },
    {
      statement: 'La grande sdfsdfdsfsdfillusion',
      valid: true,
    }
  ]
};

export const QUIZ_LIST: Quiz[] = [
  {
    id: '1',
    name: 'Les Acteurs', // What's happening if I change this statement..?
    theme: 'Actor',
    questions: [],
    image: 'assets/quiz-logo.png'
  },
  {
    id: '2',
    image: 'assets/quiz-logo.png',
    name: 'Les technos WEB',
    questions: [
      {
        id: '1',
        statement: 'Jean Gabin a jousfsdfsdfsé dans...',
        answers: [
          {
            statement: 'Les tuches sfsdfsdfsdfII',
            valid: false,
          },
          {
            statement: 'La grande sdfsdfdsfsdfillusion',
            valid: true,
          }
        ]
      },
      {id: '1',
        statement: 'Jean Gabin a joué dans...',
        answers: [
          {
            statement: 'Les tuches II',
            valid: false,
          },
          {
            statement: 'La grande illusion',
            valid: true,
          }
        ]}
    ],
  }
];
