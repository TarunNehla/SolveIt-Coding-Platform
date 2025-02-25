#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl "\n"

void solve()
{
    int n;
    cin >> n;
    int m;
    cin >> m;
    int k;
    cin >> k;

    int g;
    cin >> g;
    vector<int> v(g);
    for (auto &it : v)
    {
        cin >> it;
    }

    sort(v.rbegin(), v.rend());

    vector<int> val;
    // hame val ko values deni jo har index jitni baar us square m aavega.
    // for every index , we will compute its value based on its current position and value of k.
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            int valid_x = min(i, n - k) - max(0LL, i - (k - 1)) + 1;
            int valid_y = min(j, m - k) - max(0LL, j - (k - 1)) + 1;
            int total = max(0LL, valid_x) * max(0LL, valid_y);
            val.push_back(total);
        }
    }

    sort(val.rbegin(), val.rend());

    int ans = 0;
    for (int i = 0; i < g; i++)
    {
        ans += val[i] * v[i];
    }
    cout << ans << endl;

    return;
}

signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int t;
    cin >> t;
    while (t--)
    {
        solve();
    }
    return 0;
}