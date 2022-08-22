function Get-TimeStamp {    
    return "[{0:yyyy-MM-dd} {0:HH:mm:ss}]" -f (Get-Date)    
}

Function Get-WebRequestBody([ScriptBlock]$s, $apiUrl, $method, $body)
{
    (Perform-WebRequest $s $apiUrl $method $body).Content | ConvertFrom-Json 
}

Function Get-AuthHeaderBasicAdmin
{
    # In 16.5 U13+ calls to /{{tenant}}/api/jobs return a 401 Unauthorized when we use API key. This will be fixed in U16.
    # As a workaround get Basic Auth token for Administrator
    $base64AuthString = Get-Base64AuthInfo "Administrator" "Administrator"
    @{
        "Authorization" = "Basic " + $base64AuthString
        "Accept-Encoding" = "gzip"
    }
}
Function Perform-WebRequest([ScriptBlock]$s, $apiUrl, $method, $body)
{   
    $DebugPreference = 'Continue'
    Write-Debug "$(Get-Timestamp) Invoking Web Request $($method) $($apiUrl)"
    $webRequestStartTime = Get-Date

    try {        
        #$measure = Measure-Command { $response = $s.Invoke() }
        $response = $s.Invoke()
        $webRequestTimespan = New-TimeSpan -Start $webRequestStartTime -End (Get-Date)        
        $backendServer = $response.Headers.'X-BackendServer'
        Write-Debug "$(Get-Timestamp) Completed request to $($method) $($apiUrl) in $([math]::Round($webRequestTimespan.TotalMilliseconds))ms; X-BackendServer: $backendServer"        
        return $response
    }
    catch {
        $webRequestTimespan = New-TimeSpan -Start $webRequestStartTime -End (Get-Date)     
        $innerEx = $_.Exception.InnerException.InnerException     
        Write-Debug "$(Get-Timestamp) ERROR: Web request error in $([math]::Round($webRequestTimespan.TotalMilliseconds))ms from $($method) $($apiUrl)"
        $backendServer = $innerEx.Response.Headers['X-BackendServer']
        Write-Debug "Header X-BackendServer: $backendServer"
        Write-Debug "StatusCode: $($innerEx.Response.StatusCode.value__)"
        Write-Debug "StatusDescription: $($innerEx.Response.StatusDescription)"
        if ($body)
        {
            Write-Debug "Request body: $($body)"
        }
        $result = $innerEx.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($result)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd();
        Write-Debug "Response body: $($responseBody)"
        #throw "Web request error on $($method) $($apiUrl)"
    }
}

$foundIt = $false
$apiUrl = "https://safe.adventofquorum.org/safe/unlock"
for ($i = 80000; $i -lt 99999; $i++) {
  [string]$s = $i
  $charArray = $s.ToCharArray()
  $sum = 0
  foreach ($char in $charArray) {
    $sum = $sum + ([string]$char)
  }
  if ($sum -eq 12) {
    $postBody = "{ ""code"": ""$i"" }"
    #$postEncoded = [System.Text.Encoding]::UTF8.GetBytes($postBody)
    #$s = [scriptblock]::create("Invoke-WebRequest -Uri $apiUrl -Method POST -Body $postBody")
    
    #$s = {Invoke-WebRequest -Uri $apiUrl -Method POST -Body ([System.Text.Encoding]::UTF8.GetBytes($postBody))}
    $respBody = Invoke-RestMethod -Uri $apiUrl -Method POST -Body $postBody -ContentType "application/json"
    #$respBody = Get-WebRequestBody $s  $apiUrl "POST"

    if($respBody.success -eq $true) {
      Write-Output "Hurrah - code is $i"
      Write-Output $respBody
      break
    } else {
      Write-Output "Unsuccessful attempt: $i"
      Write-Output $respBody
    }
  }  
}
