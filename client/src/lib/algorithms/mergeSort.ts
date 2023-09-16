import { userWithFriendid } from "@/models/User";

export default function mergeSortByUsername(
  inputArray: userWithFriendid[]
): userWithFriendid[] {
  if (inputArray.length <= 1) {
    return inputArray;
  }

  const middle = Math.floor(inputArray.length / 2);
  const left = inputArray.slice(0, middle);
  const right = inputArray.slice(middle);

  return merge(mergeSortByUsername(left), mergeSortByUsername(right));
}

function merge(
  left: userWithFriendid[],
  right: userWithFriendid[]
): userWithFriendid[] {
  let result: userWithFriendid[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].username < right[rightIndex].username) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}
