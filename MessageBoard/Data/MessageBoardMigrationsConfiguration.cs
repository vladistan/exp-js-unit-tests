using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;

namespace MessageBoard.Data
{
    public class MessageBoardMigrationsConfiguration :
        DbMigrationsConfiguration<MessageBoardContext>
    {
        public MessageBoardMigrationsConfiguration()
        {
            this.AutomaticMigrationDataLossAllowed = true;
            this.AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(MessageBoardContext context)
        {
            base.Seed(context);

#if DEBUG
            if (context.Topics.Count() == 0)
            {
                var topic = new Topic()
                {
                    Title = "New greate topic",
                    Created = DateTime.Now,
                    Body = "THis topic is good",
                    Replies = new List<Reply>()
                    {
                        new Reply()
                        {
                            Body = "We hate this topic",
                            Created = DateTime.Now
                        },
                        new Reply()
                        {
                            Body = "We don't like haters",
                            Created = DateTime.Now
                        }
                    }
                };

                context.Topics.Add(topic);

                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    var msg = ex.Message;
                }
            }
#endif
        }
    }
}