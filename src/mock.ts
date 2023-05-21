import Task from 'types-Task'
import Tag from 'types-Tag'
import HistoricTask from 'types-HistoricTask'

type StateType = {
  tasks: Task[],
  tags: Tag[],
  history: HistoricTask[]
};

export const mockTasks: StateType =
{
  tags: [
    { id: 0, name: 'My tasks', color: '#FF6900' },
    { id: 2, name: 'escuela', color: '#FCB900' },
    { id: 3, name: 'programming', color: '#7BDCB5' },
    { id: 4, name: 'casa', color: '#00D084' }
  ],
  tasks: [
    {
      "name": "Uno",
      "tag": "escuela",
      "id": 1,
      "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
      "date": "2022-06-22",
      "type": "normal",
      'completed': false,
      'defaultBlocks': 0,
      "blocks": null,
      "repeat": 'daily',
      "repeatOn": [true, true, true, true, true, true, true],
    },
    {
      "name": "Dos",
      "tag": "escuela",
      "id": 2,
      "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
      "date": "2022-06-21",
      "type": "block",
      'completed': false,
      'defaultBlocks': 2,
      "blocks": 2,
      "repeat": 'no-repeat',
      "repeatOn": [false, false, false, false, false, false, false]
    },
    {
      "name": "Tres",
      "tag": "escuela",
      "id": 3,
      "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
      "date": "2022-06-23",
      "type": "block",
      'completed': false,
      'defaultBlocks': 3,
      "blocks": 3,
      "repeat": 'no-repeat',
      "repeatOn": [false, false, false, false, false, false, false]
    },
    {
      "name": "Cuatro",
      "tag": "escuela",
      "id": 4,
      "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
      "date": "2022-06-21",
      "type": "normal",
      'completed': false,
      'defaultBlocks': 0,
      "blocks": null,
      "repeat": 'no-repeat',
      "repeatOn": [false, false, false, false, false, false, false]
    },
    {
      "name": "Cinco",
      "tag": "escuela",
      "id": 5,
      "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
      "date": "2022-06-24",
      "type": "normal",
      'completed': false,
      'defaultBlocks': 0,
      "blocks": null,
      "repeat": 'no-repeat',
      "repeatOn": [false, false, false, false, false, false, false]
    },
    {
      "name": "Seis",
      "tag": "escuela",
      "id": 6,
      "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
      "date": "2022-06-24",
      "type": "normal",
      'completed': false,
      'defaultBlocks': 0,
      "blocks": null,
      "repeat": 'no-repeat',
      "repeatOn": [false, false, false, false, false, false, false]
    },
    {
      "name": "Siete",
      "tag": "escuela",
      "id": 7,
      "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
      "date": "2022-07-24",
      "type": "normal",
      'completed': false,
      'defaultBlocks': 0,
      "blocks": null,
      "repeat": 'no-repeat',
      "repeatOn": [false, false, false, false, false, false, false]
    },
    {
      "name": "Ocho",
      "tag": "casa",
      "id": 8,
      "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
      "date": null,
      "type": "normal",
      'completed': false,
      'defaultBlocks': 0,
      "blocks": null,
      "repeat": 'daily',
      "repeatOn": [false, false, false, false, false, false, false]
    },
    {
      "name": "Nueve",
      "tag": "programming",
      "id": 9,
      "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
      "date": null,
      "type": "normal",
      'completed': false,
      'defaultBlocks': 0,
      "blocks": null,
      "repeat": 'daily',
      "repeatOn": [false, false, false, false, false, false, false]
    },
    {
      "name": "Diez",
      "tag": "programming",
      "id": 10,
      "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
      "date": null,
      "type": "normal",
      'completed': false,
      'defaultBlocks': 0,
      "blocks": null,
      "repeat": 'weekly',
      "repeatOn": [false, true, true, false, false, false, false],
    },

  ],
  history: [],
}


