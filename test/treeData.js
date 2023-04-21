const tree = [
  {
    id: '1430426002516873218',
    parentId: '0',
    weight: 0,
    name: ' 基础知识',
    children: [
      {
        id: '1430426252627415042',
        parentId: '1430426002516873218',
        weight: 2,
        name: '拼音',
        children: [
          {
            id: '1431055859768627201',
            parentId: '1430426252627415042',
            weight: 0,
            name: '声母',
            children: [
              {
                id: '1431058581184057346',
                parentId: '1431055859768627201',
                weight: 0,
                name: '平舌音'
              },
              {
                id: '1431058615329886210',
                parentId: '1431055859768627201',
                weight: 1,
                name: '翘舌音'
              }
            ]
          },
          {
            id: '1431055888554135553',
            parentId: '1430426252627415042',
            weight: 1,
            name: '韵母',
            children: [
              {
                id: '1431058321242066945',
                parentId: '1431055888554135553',
                weight: 0,
                name: '单韵母'
              },
              {
                id: '1431058355790548994',
                parentId: '1431055888554135553',
                weight: 1,
                name: '复韵母'
              },
              {
                id: '1431058387759534082',
                parentId: '1431055888554135553',
                weight: 2,
                name: '鼻韵母',
                children: [
                  {
                    id: '1431058477064654850',
                    parentId: '1431058387759534082',
                    weight: 0,
                    name: '前鼻韵母'
                  },
                  {
                    id: '1431058515807440897',
                    parentId: '1431058387759534082',
                    weight: 1,
                    name: '后鼻韵母'
                  }
                ]
              },
              {
                id: '1431058425734762498',
                parentId: '1431055888554135553',
                weight: 3,
                name: '特殊韵母'
              }
            ]
          },
          {
            id: '1431055920586035202',
            parentId: '1430426252627415042',
            weight: 2,
            name: '音节',
            children: [
              {
                id: '1431056615791923202',
                parentId: '1431055920586035202',
                weight: 0,
                name: '儿化音节'
              },
              {
                id: '1431056670796025857',
                parentId: '1431055920586035202',
                weight: 1,
                name: '零声母音节'
              },
              {
                id: '1431056730397085697',
                parentId: '1431055920586035202',
                weight: 2,
                name: '整体认读音节'
              },
              {
                id: '1431056811204546561',
                parentId: '1431055920586035202',
                weight: 3,
                name: '音节拼写规则',
                children: [
                  {
                    id: '1431056930389889025',
                    parentId: '1431056811204546561',
                    weight: 0,
                    name: '轻声'
                  },
                  {
                    id: '1431058007050948610',
                    parentId: '1431056811204546561',
                    weight: 1,
                    name: 'ü的用法'
                  },
                  {
                    id: '1431058050814316546',
                    parentId: '1431056811204546561',
                    weight: 2,
                    name: '隔音符号'
                  },
                  {
                    id: '1431058104878895105',
                    parentId: '1431056811204546561',
                    weight: 3,
                    name: '变调规律'
                  },
                  {
                    id: '1431058165784383490',
                    parentId: '1431056811204546561',
                    weight: 4,
                    name: '大写字母的使用'
                  },
                  {
                    id: '1431058263549415426',
                    parentId: '1431056811204546561',
                    weight: 5,
                    name: 'y、w的作用和使用'
                  }
                ]
              }
            ]
          },
          {
            id: '1431055976265420802',
            parentId: '1430426252627415042',
            weight: 3,
            name: '字母（表）',
            children: [
              {
                id: '1431056407725084674',
                parentId: '1431055976265420802',
                weight: 0,
                name: '字母表顺序'
              },
              {
                id: '1431056504609312769',
                parentId: '1431055976265420802',
                weight: 1,
                name: '大小写对应'
              },
              {
                id: '1431056560838152194',
                parentId: '1431055976265420802',
                weight: 2,
                name: '字母书写规则'
              }
            ]
          },
          {
            id: '1431056039494553602',
            parentId: '1430426252627415042',
            weight: 4,
            name: '声调与标调'
          },
          {
            id: '1431056159057383426',
            parentId: '1430426252627415042',
            weight: 5,
            name: '拼读方法',
            children: [
              {
                id: '1431056291932934146',
                parentId: '1431056159057383426',
                weight: 0,
                name: '两拼法'
              },
              {
                id: '1431056332890312706',
                parentId: '1431056159057383426',
                weight: 1,
                name: '三拼法'
              }
            ]
          },
          {
            id: '1431056209594552321',
            parentId: '1430426252627415042',
            weight: 6,
            name: '拼合规律'
          }
        ]
      }
    ]
  },
  {
    id: '1430432466740449282',
    parentId: '0',
    weight: 7,
    name: '其他'
  }
]

function flatTree(source, children = 'children', filter = i => true) {
  let res = []
  source.forEach(el => {
    if (filter(el)) {
      res.push(el)
      el[children] &&
        el[children].length > 0 &&
        res.push(...flatTree(el[children], children, filter))
      delete el[children]
    }
  })
  return res
}

function treeData(
  source,
  id = 'id',
  parentId = 'parentId',
  children = 'children'
) {
  let cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter(father => {
    let branchArr = cloneData.filter(child => father[id] == child[parentId])
    branchArr.length > 0 && (father[children] = branchArr)
    return father[parentId] == '0'
  })
}

function filterTree(source, targetId) {
  return treeData(flatTree(source, 'children', e => e.id != targetId))
}

console.log(filterTree(tree, '1431055859768627201'))
