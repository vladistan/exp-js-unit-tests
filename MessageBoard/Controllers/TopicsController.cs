using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using MessageBoard.Data;

namespace MessageBoard.Controllers
{
    public class TopicsController : ApiController
    {
        private IMessageBoardRepository _repo;

        public TopicsController(IMessageBoardRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<Topic> Get(bool includeReplies = false)
        {
            IQueryable<Topic> topics;

            if (includeReplies)
            {
                topics = _repo.GetTopicsIncludingReplies();
            }
            else
            {
                topics = _repo.GetTopics();
            }
            return topics
                .OrderByDescending(t => t.Created)
                .Take(50)
                .ToList();
        }

        public HttpResponseMessage Post([FromBody] Topic newTopic)
        {

            if (newTopic.Created == default(DateTime))
            {
                newTopic.Created = DateTime.UtcNow;
            }

            if (
                _repo.AddTopic(newTopic) &&
                _repo.Save()

            )
            {
                return Request.CreateResponse(HttpStatusCode.Created, newTopic);
            }

            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

    }
}