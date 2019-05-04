func fib (n) {
  if n < 2 {
    n
  } else {
    fib(n-1) + fib(n-2)
  }
};

start = nowTime();
fib(33);
end = nowTime();
log(end - start)
