using MessageBoard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MessageBoard.Services;

namespace MessageBoard.Controllers
{
    public class HomeController : Controller
    {
        private IMailService _mail;

        public HomeController(IMailService mail)
        {
             _mail = mail;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Hello()
        {
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult MyMessages()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Contact(ContactModel model)
        {

            var msg = String.Format("From: {1}{0}Subject: {2}{0}Email:{3}{0}",
                Environment.NewLine,
                model.Name,
                model.Website,
                model.Comments
            );

            var rv = _mail.SendMail("vlad@v-lad.org", "amazon@v-lad.org", "Site Comment", msg);

            if (rv)
            {
                ViewBag.MailSent = true;
            }

            return View();
        }
    }

}