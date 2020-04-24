import {Quiz} from '../models/quiz.model';
import {Question} from '../models/question.model';

export const QUESTION_ACTOR: Question = {
  id: '1',
  statement: 'Jean Gabin a joué dans...',
  answers: [
    {
      id: 1,
      statement: 'Les tuches II',
      valid: false,
    },
    {
      id: 2,
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
      id: 3,
      statement: 'Les tuches sfsdfsdfsdfII',
      valid: false,
    },
    {
      id: 4,
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
            id: 5,
            statement: 'Les tuches sfsdfsdfsdfII',
            valid: false,
          },
          {
            id: 6,
            statement: 'La grande sdfsdfdsfsdfillusion',
            valid: true,
          }
        ]
      },
      {id: '1',
        statement: 'Jean Gabin a joué dans...',
        answers: [
          {
            id: 7,
            statement: 'Les tuches II',
            valid: false,
          },
          {
            id: 8,
            statement: 'La grande illusion',
            valid: true,
          }
        ]}
    ],
  }
];
