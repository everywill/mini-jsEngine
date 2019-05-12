class Fib {
  fib0 = 0;
  fib1 = 1
  func fib(n) {
    if n == 0 {
      fib0
    } else {
      if n == 1 {
        this.fib1
      } else {
        fib(n - 1) + fib(n - 2)
      }
    }
  }
};

start = nowTime();
f = Fib.new;
f.fib(33);
end = nowTime();
log(end - start)

