import React, { Component } from 'react';
import DepCard from './DepCard';

class DepGraph extends Component {
  cards() {
    return {
      'github/d3/d3#4356': {
        host: 'github',
        title: 'd3/d3$4356',
        href: 'https://github.com/d3/d3/pull/4356',
        done: true,
      },
      'github/gviz/gviz-d3#32': {
        host: 'github',
        title: 'gviz/gviz-d3#32',
        href: 'https://github.com/d3/d3/pull/4356',
        done: true,
      },
      'github/jbenet/depviz#1': {
        host: 'github',
        title: 'jbenet/depviz#1',
        href: 'https://github.com/jbenet/depviz/issues/1',
        done: false,
        dependencies: [
          'github/jbenet/depviz#10',
        ],
      },
      'github/jbenet/depviz#2': {
        host: 'github',
        title: 'jbenet/depviz#2',
        href: 'https://github.com/jbenet/depviz/issues/2',
        done: true,
      },
      'github/jbenet/depviz#3': {
        host: 'github',
        title: 'jbenet/depviz#3',
        href: 'https://github.com/jbenet/depviz/issues/3',
        done: true,
        dependencies: [
          'github/d3/d3#4356',
          'github/gviz/gviz-d3#32',
          'github/jbenet/depviz#6',
          'github/jbenet/depviz#2',
          'gitlab/foo/bar#234',
        ],
      },
      'github/jbenet/depviz#5': {
        host: 'github',
        title: 'jbenet/depviz#5',
        href: 'https://github.com/jbenet/depviz/issues/5',
        done: false,
        related: [
          'github/jbenet/depviz#3',
        ],
      },
      'github/jbenet/depviz#6': {
        host: 'github',
        title: 'jbenet/depviz#6',
        href: 'https://github.com/jbenet/depviz/issues/6',
        done: true,
        dependencies: [
          'github/d3/d3#4356',
          'github/gviz/gviz-d3#32',
        ],
      },
      'github/jbenet/depviz#7': {
        host: 'github',
        title: 'jbenet/depviz#7',
        href: 'https://github.com/jbenet/depviz/issues/7',
        done: false,
        dependencies: [
          'github/jbenet/depviz#3',
        ],
      },
      'github/jbenet/depviz#10': {
        host: 'github',
        title: 'jbenet/depviz#10',
        href: 'https://github.com/jbenet/depviz/issues/10',
        done: false,
        dependencies: [
          'github/jbenet/depviz#3',
          'github/jbenet/depviz#5',
          'github/jbenet/depviz#7',
        ],
      },
      'gitlab/foo/bar#234': {
        host: 'gitlab',
        title: 'foo/bar#234',
        href: 'https://gitlab.com/foo/bar/issues/234',
        done: true,
        dependencies: [
          'github/jbenet/depviz#2',
        ],
      },
    };
  }

  depCard(card) {
    return <DepCard
      key={card.host + '/' + card.title}
      cx={card.cx} cy={card.cy}
      host={card.host}
      title={card.title}
      href={card.href}
      blockers={card.blockers}
      dependencies={card.dependencyCount}
      related={card.relatedCount}
      dependents={card.dependentCount}
      done={card.done} />
  }

  positionCards(cards) { /* FIXME: graphviz */
    /* center colum */
    cards['github/gviz/gviz-d3#32'].cx = 40;
    cards['github/gviz/gviz-d3#32'].cy = 5;
    cards['github/jbenet/depviz#3'].cx = 40;
    cards['github/jbenet/depviz#3'].cy = 15;
    cards['github/jbenet/depviz#10'].cx = 40;
    cards['github/jbenet/depviz#10'].cy = 25;
    cards['github/jbenet/depviz#1'].cx = 40;
    cards['github/jbenet/depviz#1'].cy = 35;

    /* left colum */
    cards['github/jbenet/depviz#2'].cx = 20;
    cards['github/jbenet/depviz#2'].cy = 5;
    cards['github/jbenet/depviz#5'].cx = 20;
    cards['github/jbenet/depviz#5'].cy = 20;

    /* right colum */
    cards['github/d3/d3#4356'].cx = 60;
    cards['github/d3/d3#4356'].cy = 5;
    cards['github/jbenet/depviz#7'].cx = 60;
    cards['github/jbenet/depviz#7'].cy = 20;

    /* far left colum */
    cards['gitlab/foo/bar#234'].cx = 10;
    cards['gitlab/foo/bar#234'].cy = 10;

    /* far right colum */
    cards['github/jbenet/depviz#6'].cx = 70;
    cards['github/jbenet/depviz#6'].cy = 10;

    return cards;
  }

  countDependencies(cards) {
    for (var key in cards) {
      if (true) {
        var card = cards[key];
        card.dependencyCount = card.dependencies ? card.dependencies.length : 0;
        card.relatedCount = card.related ? card.related.length : 0;
        card.dependentCount = 0;
        for (var k in cards) {
          if (cards[k].dependencies &&
              cards[k].dependencies.indexOf(key) !== -1) {
            card.dependentCount += 1;
          }
        }
      }
    }
    return cards;
  }

  render() {
    var cards = this.countDependencies(this.positionCards(this.cards()));
    var values = []; /* I couldn't get babel-polyfill working for cards.values() */
    for (var key in cards) {
      if (true) {
        values.push(cards[key]);
      }
    }
    return <svg id="svg" xmlns="http://www.w3.org/2000/svg"
          width="800" height="600" viewBox="0 0 80 60" fontSize="1">
        {values.map(this.depCard)}
      </svg>
  }
}

export default DepGraph;
