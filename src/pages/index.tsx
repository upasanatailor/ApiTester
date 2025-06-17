import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../store/slices/counterSlice";
import type { RootState } from "../store/store";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 20 }}>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+ Increment</button>
      <button onClick={() => dispatch(decrement())}>- Decrement</button>
    </div>
  );
}
