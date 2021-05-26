import { atom, selector } from "recoil";

// Atoms는 애플리케이션 상태의 source of truth를 갖는다.
// todo 리스트에서 source of truth는 todo 아이템을 나타내는 객체로 이루어진 배열이 될 것이다.

export const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

// Selector는 파생된 상태(derived state)의 일부를 나타낸다.
// 파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    // todoListFilterState와 todoListState를 추적하고 있기 때문에
    // 둘 중 하나라도 변경되면 재실행된다.
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
