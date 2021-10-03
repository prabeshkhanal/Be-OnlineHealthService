const url = 'mongodb://localhost:27017/PharmacyDelivery';
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

//testing user add
describe("User Schema test", () => {
  it("testing user add", () => {
    const user = {
      fname: "netest",
      lname: "netest",
      email: "netest@gmail.com",
      password: "deva",
      address: "test",
      phone: "1234567890",
    };
    return User.create(user).then((u_ret) => {
      expect(u_ret.email).toEqual("netest@gmail.com");
    });
  });
});