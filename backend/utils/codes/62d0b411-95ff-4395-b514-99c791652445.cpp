#include <bits/stdc++.h>
using namespace std;
#define int long long
#define endl "\n"

void solve()
{
    string s; cin>>s;
    int n = s.size();
    for(int i = 0; i<n;i++){
        int val = s[i]-'0';
        int pos = i;
        for(int j= i; j<min(i+10, n);j++){
            int newVal = (s[j]-'0')-(j-i);
            if(newVal>val){
                val = newVal;
                pos = j;
            } 
        }
        while(pos>i){
            swap(s[pos],s[pos-1]);
            pos--;
        }
        s[i] = '0'+val;
    }
    cout<<s<<endl;
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