using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using MessageBoard.Data;

namespace MessageBoard.Controllers
{
    public class RepliesController : ApiController
    {
        private IMessageBoardRepository _repo;

        public RepliesController(IMessageBoardRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<Reply> Get(int topicId)
        {
            return _repo.GetTopicReplies(topicId);
        }

    }
}