<template>
  <div class="table">
    <a-table
      :key="timeKey"
      v-model:expandedKeys="expandedKeys"
      row-key="key"
      :columns="columns"
      :data="data"
      :row-selection="rowSelection"
      style="margin-top: 20px"
      @expanded-change="handleExpand"
    >
      <template #sort="{ record }">
        <IconCaretDown
          class="table__icon handle"
          data-type="down"
          :class="[record.type === 'noDown' ? 'table__icon--disabled' : '']"
        />
        <IconCaretUp
          class="table__icon handle"
          data-type="up"
          :class="[record.type === 'noUp' ? 'table__icon--disabled' : '']"
        />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { IconCaretDown, IconCaretUp } from '@arco-design/web-vue/es/icon';
import { Message } from '@arco-design/web-vue';
import { BaseType } from '@arco-design/web-vue/es/_utils/types';
import Sortable from 'sortablejs';

const expandedKeys = ref();
type Itype = 'checkbox' | 'radio';
type Irecord = Record<string, any>;
const rowSelection = reactive({
  type: 'checkbox' as Itype,
  showCheckedAll: true,
  checkStrictly: true,
});

const columns = [
  {
    title: '类型/作物名称',
    dataIndex: 'name',
  },
  {
    title: '去年同期',
    dataIndex: 'sameTerm',
  },
  {
    title: '同比增长',
    dataIndex: 'add',
  },
  {
    title: '允许浮动(%)',
    dataIndex: 'float',
  },
  {
    title: '调整顺序',
    dataIndex: 'sort',
    slotName: 'sort',
  },
];

const data = ref<Irecord[]>([
  {
    key: '1',
    name: 'Jane Doe',
    sameTerm: 23000,
    add: 10,
    float: '10',
    children: [
      {
        key: '1-1',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        children: [
          {
            key: '1-1-1',
            name: 'Ed Hellen',
            salary: 17000,
            address: '42 Park Road, London',
            email: 'ed.hellen@example.com',
          },
          {
            key: '1-1-2',
            name: 'William Smith',
            salary: 27000,
            address: '62 Park Road, London',
            email: 'william.smith@example.com',
          },
        ],
      },
      {
        key: '1-2',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        children: [
          {
            key: '1-2-1',
            name: 'Ed Hellen',
            salary: 17000,
            address: '42 Park Road, London',
            email: 'ed.hellen@example.com',
          },
          {
            key: '1-2-2',
            name: 'William Smith',
            salary: 27000,
            address: '62 Park Road, London',
            email: 'william.smith@example.com',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
    children: [
      {
        key: '2-1',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        children: [
          {
            key: '2-1-1',
            name: 'William Smith',
            salary: 27000,
            address: '62 Park Road, London',
            email: 'william.smith@example.com',
          },
          {
            key: '2-1-2',
            name: 'Alisa Ross',
            salary: 25000,
            address: '35 Park Road, London',
            email: 'alisa.ross@example.com',
          },
        ],
      },
    ],
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
    children: [
      {
        key: '3-1',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        children: [
          {
            key: '3-1-1',
            name: 'William Smith',
            salary: 27000,
            address: '62 Park Road, London',
            email: 'william.smith@example.com',
          },
          {
            key: '3-1-2',
            name: 'William Smith',
            salary: 27000,
            address: '62 Park Road, London',
            email: 'william.smith@example.com',
          },
        ],
      },
      {
        key: '3-2',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        children: [
          {
            key: '3-2-1',
            name: 'William Smith',
            salary: 27000,
            address: '62 Park Road, London',
            email: 'william.smith@example.com',
          },
          {
            key: '3-2-2',
            name: 'William Smith',
            salary: 27000,
            address: '62 Park Road, London',
            email: 'william.smith@example.com',
          },
        ],
      },
    ],
  },
]);
const timeKey = ref(Date.now());
const mySortable = ref<Sortable>();
const flatTableData = ref<Irecord[]>([]);
const flatTreeData = ref<Irecord[]>([]);
const treeTableExpandKeys = ref<BaseType[]>([]);

onMounted(() => {
  transverseNode(data.value, 1, (node, level, parentNode) => {
    node.level = level;
    node.parentId = parentNode ? parentNode.key : -1;
  });
  flatTableData.value = getFlatNode(data.value);
  drag();
});

// 处理数据
const transverseNode: (
  nodes: Irecord[],
  level: number,
  callBack: (node: Irecord, level: number, parentNode?: Irecord) => void,
  parentNode?: Irecord,
  childKey?: string
) => Irecord[] = (
  nodes,
  level = 1,
  callBack,
  parentNode,
  childKey = 'children'
) => {
  nodes.forEach((node) => {
    if (node[childKey] && node[childKey].length > 0) {
      transverseNode(node[childKey], level + 1, callBack, node, childKey);
    }
    callBack(node, level, parentNode);
  });
  return nodes;
};

// 转为一唯数组
const getFlatNode = (nodes: Irecord[], childrenKey = 'children') => {
  const arr: Irecord[] = [];
  const expanded = (data: Irecord[]) => {
    if (data && data.length > 0) {
      data
        .filter((d: Irecord) => d)
        .forEach((e) => {
          arr.push(e);
          expanded(e[childrenKey] || []);
        });
    }
  };
  expanded(nodes);
  return arr;
};

const drag = () => {
  const el = document.querySelector(
    '.table .arco-table-element tbody'
  ) as HTMLElement;

  mySortable.value = Sortable.create(el, {
    handle: '.handle',
    filter: '.table__icon--disabled',
    forceFallback: true,
    // onMove: (event) => {
    //   console.log(event);
    //   const { dragged, related } = event;
    //   const draRow = flatTreeData.value[dragged.rowIndex];
    //   const relRow = flatTreeData.value[related.rowIndex];
    //   if (draRow.parentId !== relRow.parentId) return false;
    // },
    // onStart: () => {
    //   if (mySortable.value?.toArray()) {
    //     sortList.value = mySortable.value?.toArray();
    //   }
    // },
    onEnd: ({ newIndex, oldIndex }) => {
      if (newIndex !== undefined && oldIndex !== undefined) {
        if (flatTreeData.value) {
          const currNode = flatTreeData.value[newIndex];
          const oldNode = flatTreeData.value[oldIndex];
          if (currNode.parentId !== oldNode.parentId) {
            Message.error('只允许同级进行顺序调整');
            reRender(null, data.value);
          } else {
            if (!currNode.children && !oldNode.children) {
              const oldData = flatTreeData.value.splice(oldIndex, 1)[0];
              flatTreeData.value.splice(newIndex, 0, oldData);
            }
            // console.log(flatTreeData.value);
            // const newData = getTreeData(flatTreeData.value, []);
            // console.log(newData);
            // reRender(newData, data);
          }
        }
      }
    },
  });
};

const reRender = (newData: any, initData: any) => {
  if (newData) {
    initData = [];
    nextTick(() => {
      initData = newData;
    });
  } else {
    const origin = [].concat(initData);
    initData = [];
    nextTick(() => {
      initData = origin;
      console.log(initData);
    });
  }
};

// const getTreeData = (nodes: Irecord[], resultList: Irecord[]) => {
//   const childStack: Irecord[] = [];
//   let lastNode: Irecord = {};
//   nodes.forEach((node) => {
//     delete node.children;

//     const pushNode = (dataNode: Irecord) => {
//       const parentNode = childStack[childStack.length - 1];
//       if (parentNode) {
//         parentNode.children.push(dataNode);
//       } else {
//         resultList.push(dataNode);
//       }
//     };

//     if (node.level < lastNode.level) {
//       childStack.length = node.level - 1;
//       pushNode(node);
//     } else if (node.level === lastNode.level) {
//       pushNode(node);
//     } else if (node.level > lastNode.level) {
//       if (!lastNode.children) {
//         lastNode.children = [];
//       }
//       childStack.push(lastNode);
//       pushNode(node);
//     } else {
//       resultList.push(node);
//     }
//     lastNode = node;
//   });
//   return resultList;
// };

const handleExpand = (rowKey: BaseType[]) => {
  treeTableExpandKeys.value = rowKey;
};

watch(
  treeTableExpandKeys,
  (newValue) => {
    flatTreeData.value = [];
    data.value.forEach((item) => {
      flatTreeData.value.push(item);
    });
    for (let i = 0; i < newValue.length; i++) {
      const index = flatTableData.value.findIndex(
        (item) => item.key === newValue[i]
      );
      const children = flatTableData.value[index].children || [];
      const flatIndex = flatTreeData.value.findIndex(
        (item) => item.key === newValue[i]
      );
      flatTreeData.value.splice(flatIndex + 1, 0, ...children);
    }
  },
  {
    immediate: true,
  }
);

onUnmounted(() => {
  mySortable.value && mySortable.value.destroy();
});
</script>

<style lang="less" scoped>
.table {
  .table__icon {
    cursor: pointer;
    color: #2d5cf6;
  }
  .table__icon--disabled {
    cursor: not-allowed;
    color: #ccc;
  }
}
</style>
