using System;
using System.Collections.Generic;

#nullable disable

namespace AesCloudData
{
    public partial class PgaException
    {
        public int Jexid { get; set; }
        public int Jexscid { get; set; }
        public DateTime? Jexdate { get; set; }
        public TimeSpan? Jextime { get; set; }

        public virtual PgaSchedule Jexsc { get; set; }
    }
}
