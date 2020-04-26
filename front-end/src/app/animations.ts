import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";

export const fade =
  trigger('fade', [
    transition('void => *', [
      style({opacity: 0, transform: 'scale(0.8)'}),
      animate(250)
      ])
  ]);
