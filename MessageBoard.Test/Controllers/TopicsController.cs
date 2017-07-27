using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using MessageBoard.Controllers;
using MessageBoard.Data;
using MessageBoard.Tests.Fakes;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MessageBoard.Test.Controllers
{
    /// <summary>
    /// Summary description for UnitTest1
    /// </summary>
    [TestClass]
    public class TopicsControllerTests
    {
        private TestContext testContextInstance;
        private TopicsController _topicsController;
        private FakeMessageBoardRepository _repo;

        [TestInitialize]
        public void Init()
        {
            _repo = new FakeMessageBoardRepository();
            _topicsController = new TopicsController(_repo);

        }


        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        #region Additional test attributes
        //
        // You can use the following additional attributes as you write your tests:
        //
        // Use ClassInitialize to run code before running the first test in the class
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // Use ClassCleanup to run code after all tests in a class have run
        // [ClassCleanup()]
        // public static void MyClassCleanup() { }
        //
        // Use TestInitialize to run code before running each test
        // [TestInitialize()]
        // public void MyTestInitialize() { }
        //
        // Use TestCleanup to run code after each test has run
        // [TestCleanup()]
        // public void MyTestCleanup() { }
        //
        #endregion

        [TestMethod]
        public void TopicsController_Post()
        {
            Topic topic = new Topic()
            {
                Title = "Hello there",
                Body  = "Test topic body"
            };

            var config = new HttpConfiguration();


            var res = _topicsController.Post(topic);
            Assert.Equals(res.StatusCode, 3000);
        }

        [TestMethod]
        public void TopicsController_Get()
        {
            var res = _topicsController.Get(false);

            Assert.IsNotNull(res);
            Assert.IsTrue(res.Count() > 0 );
            Assert.IsNotNull(res.First());
            Assert.IsNotNull(res.First().Title);


        }


    }
}
