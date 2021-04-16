using System;
using System.Collections.Generic;

#nullable disable

namespace AesCloudData
{
    public partial class PgaJob
    {
        public PgaJob()
        {
            PgaJoblogs = new HashSet<PgaJoblog>();
            PgaJobsteps = new HashSet<PgaJobstep>();
            PgaSchedules = new HashSet<PgaSchedule>();
        }

        public int Jobid { get; set; }
        public int Jobjclid { get; set; }
        public string Jobname { get; set; }
        public string Jobdesc { get; set; }
        public string Jobhostagent { get; set; }
        public bool? Jobenabled { get; set; }
        public DateTime Jobcreated { get; set; }
        public DateTime Jobchanged { get; set; }
        public int? Jobagentid { get; set; }
        public DateTime? Jobnextrun { get; set; }
        public DateTime? Joblastrun { get; set; }

        public virtual PgaJobagent Jobagent { get; set; }
        public virtual PgaJobclass Jobjcl { get; set; }
        public virtual ICollection<PgaJoblog> PgaJoblogs { get; set; }
        public virtual ICollection<PgaJobstep> PgaJobsteps { get; set; }
        public virtual ICollection<PgaSchedule> PgaSchedules { get; set; }
    }
}
