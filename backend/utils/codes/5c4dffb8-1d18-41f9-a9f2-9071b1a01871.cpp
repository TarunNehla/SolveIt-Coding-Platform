#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl "\n"

void solve()
{
    int n; cin>>n;
 vector<int>v = {1,2}; 
 cout<<v[400]<<endl; 
   int rem = n%3;

    if(rem==0){
        cout<<n/3<<endl;
    }
    else if(n==1){
        cout<<2<<endl;
    }
    else{
        cout<<(n/3)+1<<endl;
    }
    
    return;
}

signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int t; cin>>t;
    while (t--)
    {
        solve();
    }
    return 0;
}
