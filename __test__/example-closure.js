func counter (c) {
  closure () {
    c = c + 1
  }
};

c1 = counter (0);
c2 = counter (0);

c1();
c1();
c2()
