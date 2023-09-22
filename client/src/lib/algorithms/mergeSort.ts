import { userWithFriendid } from "@/models/User";

export default function mergeSortByUsername(
  inputArray: userWithFriendid[]
): userWithFriendid[] {
  if (inputArray.length <= 1) {
    return inputArray;
  }

  const middle = Math.floor(inputArray.length / 2);
  // Split into individual elements
  const left = inputArray.slice(0, middle);
  const right = inputArray.slice(middle);

  return merge(mergeSortByUsername(left), mergeSortByUsername(right));
}
// merge the individual elements during the merging process
function merge(
  left: userWithFriendid[],
  right: userWithFriendid[]
): userWithFriendid[] {
  // Combination of merging combinations
  let result: userWithFriendid[] = [];
  let leftIndex = 0; // For left arr
  let rightIndex = 0; // For right arr

  // While there are still elemets in both arrays
  while (leftIndex < left.length && rightIndex < right.length) {
    // If first item in left is smaller then add to result
    if (left[leftIndex].username < right[rightIndex].username) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  // Add some other elements left in the array if one is empty
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}
