export const groupMapBy = <Value, GroupKey extends string | number>(
  array: Value[],
  grouper: (value: Value, index: number) => GroupKey
): Map<GroupKey, Value[]> => {
  const result = new Map<GroupKey, Value[]>();

  array.forEach((value, index) => {
    const groupKey = grouper(value, index);
    const groupedItem = result.get(groupKey) || [];
    groupedItem.push(value);
    result.set(groupKey, groupedItem);
  });

  return result;
};
