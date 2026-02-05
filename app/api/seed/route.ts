import { NextResponse } from "next/server";
import { initDb, getDb } from "@/lib/db";

const posts = [
  {
    name: "cache-friendly-data-structures",
    content: `<h1>Cache-Friendly Data Structures</h1>
<p>In low-latency C++ systems, <strong>cache misses are the silent killer</strong>. A single L3 cache miss can cost 40-70 nanoseconds — an eternity when you're targeting sub-microsecond response times.</p>
<h2>Prefer Arrays Over Linked Lists</h2>
<p>Linked lists scatter nodes across the heap, causing constant cache misses as you traverse them. Use <code>std::vector</code> or flat arrays instead. Even if insertions are O(n), the cache locality often makes them faster in practice than O(1) linked list operations.</p>
<h2>Structure of Arrays (SoA) vs Array of Structures (AoS)</h2>
<p>If you only access a few fields during a hot loop, SoA layout packs the accessed data together in cache lines:</p>
<p><strong>AoS (bad for partial access):</strong></p>
<pre>struct Order { uint64_t id; double price; int qty; char side; };
Order orders[1000]; // each Order = 24 bytes, lots of wasted cache</pre>
<p><strong>SoA (cache-friendly):</strong></p>
<pre>struct Orders {
    uint64_t ids[1000];
    double prices[1000];
    int qtys[1000];
    char sides[1000];
};</pre>
<h2>Key Takeaways</h2>
<ul>
<li>Profile with <code>perf stat</code> to measure L1/L2/L3 cache miss rates</li>
<li>Keep hot data contiguous in memory</li>
<li>Avoid pointer chasing — flatten your data structures</li>
<li>Align structures to cache line boundaries (64 bytes) with <code>alignas(64)</code></li>
</ul>`,
  },
  {
    name: "lock-free-programming",
    content: `<h1>Lock-Free Programming Essentials</h1>
<p>Mutexes are the enemy of low latency. A contested mutex can stall a thread for <strong>microseconds or more</strong> due to context switches. Lock-free data structures eliminate this bottleneck.</p>
<h2>Atomic Operations</h2>
<p>C++11 introduced <code>std::atomic</code> which maps to hardware CAS (Compare-And-Swap) instructions:</p>
<pre>std::atomic&lt;int&gt; counter{0};
counter.fetch_add(1, std::memory_order_relaxed); // lock-free increment</pre>
<h2>SPSC Queue: The Workhorse</h2>
<p>The Single-Producer Single-Consumer queue is the most common lock-free structure in trading systems. It requires only two atomic variables (head and tail):</p>
<pre>template&lt;typename T, size_t N&gt;
class SPSCQueue {
    alignas(64) std::atomic&lt;size_t&gt; head_{0};
    alignas(64) std::atomic&lt;size_t&gt; tail_{0};
    alignas(64) T buffer_[N];
public:
    bool push(const T&amp; val) {
        auto tail = tail_.load(std::memory_order_relaxed);
        auto next = (tail + 1) % N;
        if (next == head_.load(std::memory_order_acquire)) return false;
        buffer_[tail] = val;
        tail_.store(next, std::memory_order_release);
        return true;
    }
};</pre>
<h2>Memory Ordering Matters</h2>
<ul>
<li><code>memory_order_relaxed</code> — no ordering guarantees, fastest</li>
<li><code>memory_order_acquire/release</code> — sufficient for most producer-consumer patterns</li>
<li><code>memory_order_seq_cst</code> — full ordering, slowest (the default — avoid on hot paths)</li>
</ul>
<p><strong>Rule of thumb:</strong> Start with <code>seq_cst</code> for correctness, then relax ordering only after profiling and careful reasoning.</p>`,
  },
  {
    name: "memory-allocation-strategies",
    content: `<h1>Memory Allocation Strategies for Low Latency</h1>
<p>Calling <code>malloc()</code> or <code>new</code> on the hot path is a cardinal sin in low-latency C++. The default allocator can take <strong>hundreds of nanoseconds</strong> and may even trigger a syscall (mmap/brk).</p>
<h2>Pre-Allocate Everything</h2>
<p>The best allocation strategy is to not allocate at all during runtime. Reserve all memory at startup:</p>
<pre>// At startup
std::vector&lt;Order&gt; order_pool;
order_pool.reserve(MAX_ORDERS); // one-time allocation

// On hot path — no allocation
order_pool.emplace_back(new_order); // uses pre-reserved memory</pre>
<h2>Object Pools</h2>
<p>For fixed-size objects, use a free-list pool:</p>
<pre>template&lt;typename T, size_t N&gt;
class ObjectPool {
    alignas(64) std::array&lt;T, N&gt; storage_;
    std::array&lt;T*, N&gt; free_list_;
    size_t free_count_ = N;
public:
    ObjectPool() {
        for (size_t i = 0; i &lt; N; ++i)
            free_list_[i] = &amp;storage_[i];
    }
    T* acquire() { return free_list_[--free_count_]; }
    void release(T* p) { free_list_[free_count_++] = p; }
};</pre>
<h2>Huge Pages</h2>
<p>TLB misses add ~20ns per miss. Use 2MB huge pages to reduce TLB pressure:</p>
<pre>void* p = mmap(nullptr, size, PROT_READ|PROT_WRITE,
               MAP_PRIVATE|MAP_ANONYMOUS|MAP_HUGETLB, -1, 0);</pre>
<h2>Golden Rules</h2>
<ul>
<li>Never call <code>new</code>/<code>delete</code>/<code>malloc</code>/<code>free</code> on the hot path</li>
<li>Use <code>mlock()</code> to prevent pages from being swapped out</li>
<li>Consider <code>jemalloc</code> or <code>tcmalloc</code> for the non-hot path allocations</li>
<li>Pre-fault memory at startup to avoid page faults later</li>
</ul>`,
  },
  {
    name: "compiler-optimizations",
    content: `<h1>Compiler Optimizations and Intrinsics</h1>
<p>Your compiler is your best friend — if you know how to talk to it. The difference between naive and optimized code can be <strong>10x or more</strong>.</p>
<h2>Essential Compiler Flags</h2>
<pre>g++ -O3 -march=native -mtune=native -flto -fno-rtti -fno-exceptions</pre>
<ul>
<li><code>-O3</code> — aggressive optimizations including vectorization</li>
<li><code>-march=native</code> — use all CPU instructions available (AVX2, BMI2, etc.)</li>
<li><code>-flto</code> — Link-Time Optimization: enables cross-translation-unit inlining</li>
<li><code>-fno-rtti</code> — disable RTTI (saves vtable overhead)</li>
<li><code>-fno-exceptions</code> — disable exceptions (eliminates unwinding tables)</li>
</ul>
<h2>Branch Hints</h2>
<p>Tell the compiler which branches are likely/unlikely:</p>
<pre>if (__builtin_expect(order.qty &gt; 0, 1)) {  // likely
    process(order);
}
// C++20:
if (error) [[unlikely]] { handle_error(); }</pre>
<h2>Force Inlining</h2>
<pre>__attribute__((always_inline)) inline void hot_function() {
    // This WILL be inlined, no matter what
}</pre>
<h2>Restrict Pointers</h2>
<p>Tell the compiler pointers don't alias, enabling more aggressive optimization:</p>
<pre>void process(double* __restrict__ prices, int* __restrict__ qtys, int n) {
    for (int i = 0; i &lt; n; ++i)
        prices[i] *= qtys[i]; // compiler can vectorize this now
}</pre>
<h2>Always Check the Assembly</h2>
<p>Use <a href="https://godbolt.org">Compiler Explorer (godbolt.org)</a> to verify your optimizations actually work. Don't trust — verify.</p>`,
  },
  {
    name: "simd-vectorization",
    content: `<h1>SIMD and Vectorization</h1>
<p>Modern CPUs can process <strong>4, 8, or even 16 values simultaneously</strong> with SIMD (Single Instruction, Multiple Data). Not using SIMD means leaving most of your CPU's throughput on the table.</p>
<h2>Auto-Vectorization</h2>
<p>The compiler can often vectorize simple loops automatically with <code>-O3 -march=native</code>. But it needs help:</p>
<pre>// Vectorizable — simple, no dependencies
for (int i = 0; i &lt; n; ++i)
    result[i] = prices[i] * quantities[i];

// NOT vectorizable — loop-carried dependency
for (int i = 1; i &lt; n; ++i)
    result[i] = result[i-1] + prices[i];</pre>
<h2>Explicit SIMD with Intrinsics (AVX2)</h2>
<pre>#include &lt;immintrin.h&gt;

void multiply_prices(const double* a, const double* b, double* out, int n) {
    for (int i = 0; i &lt; n; i += 4) {
        __m256d va = _mm256_load_pd(&amp;a[i]);
        __m256d vb = _mm256_load_pd(&amp;b[i]);
        __m256d vr = _mm256_mul_pd(va, vb);
        _mm256_store_pd(&amp;out[i], vr);
    }
}</pre>
<h2>Practical Applications in Trading</h2>
<ul>
<li><strong>Price level scanning</strong> — compare order price against multiple book levels at once</li>
<li><strong>Risk calculations</strong> — portfolio Greeks computed in parallel</li>
<li><strong>Checksum computation</strong> — CRC32 with hardware acceleration</li>
<li><strong>String parsing</strong> — FIX protocol field scanning with SIMD strcmp</li>
</ul>
<h2>Tips</h2>
<ul>
<li>Align data to 32 bytes for AVX2: <code>alignas(32) double prices[N];</code></li>
<li>Use <code>-ftree-vectorizer-verbose=2</code> to see what the compiler vectorized</li>
<li>Benchmark! SIMD doesn't always win for small N due to setup overhead</li>
</ul>`,
  },
  {
    name: "kernel-bypass-networking",
    content: `<h1>Kernel Bypass Networking</h1>
<p>The Linux kernel network stack adds <strong>5-15 microseconds</strong> of latency per packet. For ultra-low-latency systems, kernel bypass is essential — it lets your application talk directly to the NIC.</p>
<h2>Why the Kernel Is Slow</h2>
<ul>
<li>System call overhead (user/kernel mode switch: ~100ns)</li>
<li>Socket buffer copies</li>
<li>Protocol stack processing</li>
<li>Interrupt handling and context switches</li>
<li>Lock contention in the network stack</li>
</ul>
<h2>DPDK (Data Plane Development Kit)</h2>
<p>DPDK is the most popular kernel bypass framework. It uses poll-mode drivers (PMD) to busy-poll the NIC:</p>
<pre>// DPDK receive loop — no system calls, no interrupts
while (running) {
    uint16_t nb_rx = rte_eth_rx_burst(port_id, queue_id, pkts, BURST_SIZE);
    for (uint16_t i = 0; i &lt; nb_rx; ++i) {
        process_packet(pkts[i]);
        rte_pktmbuf_free(pkts[i]);
    }
}</pre>
<h2>Solarflare OpenOnload</h2>
<p>OpenOnload is simpler to adopt — it intercepts standard socket calls and bypasses the kernel transparently. No code changes required, just:</p>
<pre>onload ./my_trading_app</pre>
<h2>io_uring (Middle Ground)</h2>
<p>If full kernel bypass isn't feasible, <code>io_uring</code> (Linux 5.1+) reduces syscall overhead significantly with batched, async I/O.</p>
<h2>Trade-offs</h2>
<ul>
<li>Kernel bypass dedicates CPU cores to polling (100% utilization even when idle)</li>
<li>You lose kernel features: iptables, tcpdump, network monitoring</li>
<li>Debugging is harder without standard tools</li>
<li>Requires specialized NICs (Solarflare, Mellanox)</li>
</ul>`,
  },
  {
    name: "hot-path-optimization",
    content: `<h1>Hot Path Optimization</h1>
<p>In a trading system, the <strong>hot path</strong> is the critical code executed on every market data tick or order. It typically represents less than 1% of your codebase but determines 99% of your latency.</p>
<h2>Identify Your Hot Path</h2>
<p>Use profiling to find it — don't guess:</p>
<pre>perf record -g ./my_app
perf report</pre>
<p>Or use CPU cycle counters for precise measurement:</p>
<pre>inline uint64_t rdtsc() {
    unsigned int lo, hi;
    __asm__ volatile ("rdtsc" : "=a"(lo), "=d"(hi));
    return ((uint64_t)hi &lt;&lt; 32) | lo;
}

auto start = rdtsc();
process_tick(md);
auto cycles = rdtsc() - start;</pre>
<h2>Hot Path Rules</h2>
<ol>
<li><strong>No memory allocation</strong> — everything pre-allocated</li>
<li><strong>No system calls</strong> — no logging, no I/O, no malloc</li>
<li><strong>No virtual function calls</strong> — use CRTP or templates instead</li>
<li><strong>No exceptions</strong> — use error codes or <code>std::expected</code></li>
<li><strong>No branching</strong> — use branchless techniques where possible</li>
<li><strong>No cache misses</strong> — keep hot data in L1/L2</li>
</ol>
<h2>Move Work Off the Hot Path</h2>
<p>Anything non-essential should happen asynchronously:</p>
<ul>
<li><strong>Logging</strong> → write to a lock-free queue, drain from another thread</li>
<li><strong>Risk checks</strong> → pre-compute limits, check with a simple comparison</li>
<li><strong>Statistics</strong> → sample, don't compute on every tick</li>
<li><strong>Serialization</strong> → use fixed-size binary formats, not JSON/protobuf</li>
</ul>
<h2>Pin the Hot Thread</h2>
<pre>cpu_set_t cpuset;
CPU_ZERO(&amp;cpuset);
CPU_SET(2, &amp;cpuset); // pin to core 2
pthread_setaffinity_np(pthread_self(), sizeof(cpuset), &amp;cpuset);</pre>
<p>Also isolate the core with <code>isolcpus=2</code> in kernel boot parameters to prevent the scheduler from placing other tasks on it.</p>`,
  },
  {
    name: "zero-cost-abstractions-with-templates",
    content: `<h1>Zero-Cost Abstractions with Templates</h1>
<p>C++ templates let you write generic, maintainable code that compiles down to the <strong>same assembly as hand-written specialized code</strong>. This is the essence of zero-cost abstraction.</p>
<h2>CRTP: Replacing Virtual Dispatch</h2>
<p>Virtual functions add ~5-10ns per call due to vtable lookup and branch misprediction. CRTP (Curiously Recurring Template Pattern) eliminates this:</p>
<pre>// Virtual dispatch — slow
struct Strategy { virtual void on_tick(Tick&amp;) = 0; };
struct MyStrategy : Strategy { void on_tick(Tick&amp; t) override { ... } };

// CRTP — zero overhead, resolved at compile time
template&lt;typename Derived&gt;
struct Strategy {
    void on_tick(Tick&amp; t) {
        static_cast&lt;Derived*&gt;(this)-&gt;on_tick_impl(t);
    }
};
struct MyStrategy : Strategy&lt;MyStrategy&gt; {
    void on_tick_impl(Tick&amp; t) { ... }
};</pre>
<h2>Policy-Based Design</h2>
<p>Compose behavior at compile time instead of runtime:</p>
<pre>template&lt;typename RiskPolicy, typename ExecutionPolicy&gt;
class OrderManager {
    RiskPolicy risk_;
    ExecutionPolicy exec_;
public:
    void submit(Order&amp; o) {
        if (risk_.check(o))  // inlined, no virtual call
            exec_.send(o);   // inlined, no virtual call
    }
};</pre>
<h2>constexpr Everything</h2>
<p>Move computation to compile time:</p>
<pre>constexpr uint64_t hash_field_tag(const char* s) {
    uint64_t h = 0;
    while (*s) h = h * 31 + *s++;
    return h;
}

// FIX tag lookup at compile time
switch (hash_field_tag(tag)) {
    case hash_field_tag("35"): parse_msg_type(); break;
    case hash_field_tag("49"): parse_sender(); break;
}</pre>
<h2>The Rule</h2>
<p><strong>If you know it at compile time, compute it at compile time.</strong> Templates, constexpr, and static polymorphism are your tools for writing clean code that runs as fast as C.</p>`,
  },
  {
    name: "benchmarking-and-measuring-latency",
    content: `<h1>Benchmarking and Measuring Latency</h1>
<p>You can't optimize what you can't measure. But <strong>measuring latency correctly is surprisingly hard</strong> — naive benchmarks will mislead you.</p>
<h2>Don't Use Wall Clock for Microbenchmarks</h2>
<p>Use the hardware timestamp counter (RDTSC) or <code>std::chrono::steady_clock</code>:</p>
<pre>auto start = std::chrono::steady_clock::now();
do_work();
auto end = std::chrono::steady_clock::now();
auto ns = std::chrono::duration_cast&lt;std::chrono::nanoseconds&gt;(end - start).count();</pre>
<h2>Measure Percentiles, Not Averages</h2>
<p>Average latency is meaningless for trading systems. A system with 1us average but 100us p99 will blow up regularly. Always report:</p>
<ul>
<li><strong>p50</strong> (median) — typical case</li>
<li><strong>p99</strong> — what happens 1% of the time</li>
<li><strong>p99.9</strong> — tail latency (often caused by GC, page faults, interrupts)</li>
<li><strong>max</strong> — worst case</li>
</ul>
<h2>Avoid Common Pitfalls</h2>
<ul>
<li><strong>Compiler elimination</strong> — use <code>benchmark::DoNotOptimize()</code> or volatile to prevent dead code elimination</li>
<li><strong>CPU frequency scaling</strong> — set governor to <code>performance</code>: <code>cpupower frequency-set -g performance</code></li>
<li><strong>Warm-up</strong> — run 10K iterations before measuring to warm caches and branch predictors</li>
<li><strong>Core isolation</strong> — pin benchmark thread and isolate core from OS noise</li>
</ul>
<h2>Use Google Benchmark</h2>
<pre>#include &lt;benchmark/benchmark.h&gt;

static void BM_OrderLookup(benchmark::State&amp; state) {
    OrderBook book = create_test_book();
    for (auto _ : state) {
        auto* order = book.find(12345);
        benchmark::DoNotOptimize(order);
    }
}
BENCHMARK(BM_OrderLookup);
BENCHMARK_MAIN();</pre>
<h2>Production Measurement</h2>
<p>In production, use a lock-free histogram (like HdrHistogram) to record latencies without affecting the hot path. Dump percentiles periodically from a separate thread.</p>`,
  },
  {
    name: "branchless-programming",
    content: `<h1>Branchless Programming</h1>
<p>Modern CPUs predict branches with ~97% accuracy. But that remaining 3% costs <strong>15-20 cycles per misprediction</strong>. On data-dependent branches (like price comparisons), misprediction rates can be much higher.</p>
<h2>Conditional Moves</h2>
<p>Replace <code>if/else</code> with arithmetic or conditional moves:</p>
<pre>// Branchy — branch predictor will struggle with random data
int min_price(int a, int b) {
    if (a &lt; b) return a;
    return b;
}

// Branchless — uses CMOV instruction
int min_price(int a, int b) {
    return a &lt; b ? a : b;  // compiler emits cmov with -O2
}

// Explicit branchless
int min_price(int a, int b) {
    return b ^ ((a ^ b) &amp; -(a &lt; b));
}</pre>
<h2>Branchless Clamp</h2>
<pre>// Clamp value to [lo, hi] without branches
int clamp(int val, int lo, int hi) {
    val = val &lt; lo ? lo : val; // cmov
    val = val &gt; hi ? hi : val; // cmov
    return val;
}</pre>
<h2>Lookup Tables Instead of Switches</h2>
<pre>// Branchy
double get_tick_size(InstrumentType t) {
    switch (t) {
        case EQUITY: return 0.01;
        case FUTURE: return 0.25;
        case OPTION: return 0.05;
    }
}

// Branchless
constexpr double TICK_SIZES[] = {0.01, 0.25, 0.05};
double get_tick_size(InstrumentType t) {
    return TICK_SIZES[static_cast&lt;int&gt;(t)];
}</pre>
<h2>When to Go Branchless</h2>
<ul>
<li><strong>Do</strong> go branchless when data is unpredictable (random market data, hash lookups)</li>
<li><strong>Don't</strong> bother when branches are highly predictable (error checks that rarely fire)</li>
<li>Always <strong>measure</strong> — sometimes the branch predictor wins</li>
<li>Check assembly on <a href="https://godbolt.org">godbolt.org</a> to confirm the compiler emits CMOV</li>
</ul>`,
  },
];

export async function GET() {
  await initDb();
  const db = getDb();

  let created = 0;
  for (const post of posts) {
    await db`
      INSERT INTO posts (name, content, created_at, updated_at)
      VALUES (${post.name}, ${post.content}, NOW(), NOW())
      ON CONFLICT (name) DO UPDATE SET content = ${post.content}, updated_at = NOW()
    `;
    created++;
  }

  return NextResponse.json({ success: true, created });
}
