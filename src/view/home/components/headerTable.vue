<template>
  <div class="table-wrap">
    <a-table
      v-model:selected-keys="selectedKeys"
      row-key="key"
      :show-header="true"
      :data="data"
      :row-selection="rowSelection"
      :pagination="false"
    >
      <template #columns>
        <a-table-column title="Name" data-index="name"> </a-table-column>
        <a-table-column title="Salary" data-index="salary"> </a-table-column>
        <a-table-column title="Address" data-index="address"> </a-table-column>
        <a-table-column title="Email" data-index="email"> </a-table-column>
        <a-table-column title="Optional" data-index="optional">
          <template #cell="{ record }">
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
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { IconCaretDown, IconCaretUp } from '@arco-design/web-vue/es/icon';
import Sortable from 'sortablejs';

const selectedKeys = ref(['Jane Doe', 'Alisa Ross']);
type Itype = 'checkbox' | 'radio';
const rowSelection = reactive({
  type: 'checkbox' as Itype,
  onlyCurrent: false,
  showCheckedAll: true,
});

const data = reactive<Record<string, any>[]>([
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
    type: 'noUp',
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
  {
    key: '6',
    name: 'Jane Doe 2',
    salary: 15000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
    type: 'noDown',
  },
]);

const mySortbale = ref<Sortable>();

onMounted(() => {
  drag();
});

// 拖拽
const drag = () => {
  const tbody = document.querySelector(
    '.table-wrap .arco-table-element tbody'
  ) as HTMLElement;
  let type = 'down';

  mySortbale.value = Sortable.create(tbody, {
    handle: '.handle',
    filter: '.table__icon--disabled',
    forceFallback: true,
    onChoose: (event: any) => {
      let element = event.originalEvent.target;
      // 可能会拿到svg子节点
      if (!element.tagName.startsWith('svg')) {
        element = element.parentNode;
      }
      type = element.getAttribute('data-type');
    },
    onMove: (event) => {
      // 判断按钮的上下拖拽
      if (type === 'down') {
        if (event.draggedRect.top < event.relatedRect.top) return true;
      } else {
        if (event.draggedRect.top > event.relatedRect.top) return true;
      }
      return false;
    },
    onEnd: ({ newIndex, oldIndex }) => {
      if (oldIndex !== undefined && newIndex !== undefined) {
        const length = data.length;
        const currRow = data.splice(oldIndex, 1)[0];
        if (newIndex === 0 || oldIndex === 0) delete data[0].type;
        if (newIndex === length - 1 || oldIndex === length - 1)
          delete data[data.length - 1].type;
        data.splice(newIndex, 0, currRow);
        updateType(newIndex, oldIndex, length);
      }
    },
  });
};

// 修改数据状态
const updateType = (newIndex: number, oldIndex: number, length: number) => {
  if (newIndex === 0) data[newIndex].type = 'noUp';
  else delete data[newIndex].type;
  if (oldIndex === 0) data[oldIndex].type = 'noUp';
  if (newIndex === length - 1) data[data.length - 1].type = 'noDown';
  if (oldIndex === length - 1) data[length - 1].type = 'noDown';
};

onUnmounted(() => {
  mySortbale.value?.destroy();
});
</script>

<style scoped lang="less">
.table-wrap {
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
