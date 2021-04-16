using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AesCloudData;

namespace AesCloudData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExchangeRateController : ControllerBase
    {
        private readonly ClouddataContext _context;
        bool norm(ref string code)
        {
            code = (code ?? "").ToUpper();
            return code.Length >= 3;
        }
        bool norm(RateToUsd that)
        {
            that.Code = (that.Code ?? "").ToUpper();
            return that.Code.Length >= 3;
        }
        public ExchangeRateController(ClouddataContext context)
        {
            _context = context;
        }

        // GET: api/ExchangeRate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RateToUsd>>> GetRateToUsds()
        {
            return await _context.RateToUsds.ToListAsync();
        }

        // GET: api/ExchangeRate/ILS
        [HttpGet("{code}")]
        public async Task<ActionResult<RateToUsd>> GetRateToUsd(string code)
        {
            if(!norm(ref code))
            {
                return BadRequest();
            }
            var rateToUsd = await _context.RateToUsds.FindAsync(code);

            if (rateToUsd == null)
            {
                return NotFound();
            }

            return rateToUsd;
        }

        // PUT: api/ExchangeRate/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkcode=2123754
        [HttpPut("{code}")]
        public async Task<IActionResult> PutRateToUsd(string code, RateToUsd rateToUsd)
        {

            if (!norm(ref code) || !norm(rateToUsd) || code != rateToUsd.Code)
            {
                return BadRequest();
            }

            _context.Entry(rateToUsd).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RateToUsdExists(code))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ExchangeRate
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkcode=2123754
        [HttpPost]
        public async Task<ActionResult<RateToUsd>> PostRateToUsd(RateToUsd rateToUsd)
        {
            if ( !norm(rateToUsd) )
            {
                return BadRequest();
            }

            _context.RateToUsds.Add(rateToUsd);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RateToUsdExists(rateToUsd.Code))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRateToUsd", new { code = rateToUsd.Code }, rateToUsd);
        }

        // DELETE: api/ExchangeRate/5
        [HttpDelete("{code}")]
        public async Task<IActionResult> DeleteRateToUsd(string code)
        {
            if (!norm(ref code))
            {
                return BadRequest();
            }

            var rateToUsd = await _context.RateToUsds.FindAsync(code);
            if (rateToUsd == null)
            {
                return NotFound();
            }

            _context.RateToUsds.Remove(rateToUsd);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RateToUsdExists(string code)
        {
            return _context.RateToUsds.Any(e => e.Code == code);
        }
    }
}
