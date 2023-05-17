export default interface Task{ 
    id: number, 
    name: string, 
    tag: string, 
    description: string, 
    date: string | null, 
    type: 'normal' | 'block', 
    completed: boolean, 
    defaultBlocks: number, 
    blocks: number|null, 
    repeat: 'daily' | 'weekly' | 'no-repeat', 
    repeatOn: boolean[], 
}



/*
"name": "Uno",
      "tag": "escuela",
      "id": 1,
      "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
      "date": "06/22/2022",
      "type": "normal",
      'completed': false,
      'defaultBlocks': 0,
      "blocks": null,
      "repeat": 'daily',
      "repeatOn": [1, 1, 1, 1, 1, 1, 1],
*/