<?php include('src/config.php') ?>
<html>
<head>
    <meta charset="utf-8">
    <title>TypingRun v.2.0</title>
    <link rel="icon" type="image/GIF" href="res/favicon.ico"/>
    <meta name="viewport" content="width=800,target-densitydpi=device-dpi,user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="yes"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        body, canvas, div {
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            -khtml-user-select: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
    </style>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="js/bootstrap.js"></script>
</head>
<body style="padding:0; margin: 0; background: #000;">
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    <script src="cocos2d.js"></script>
    <div class = "container">
        <div class = "row">
           <br>
            <div class="panel panel-default">
                <div class="panel-heading">
                     <h3 class="panel-title">LeaderBoard</h3>
                 </div>
                 <div class="panel-body">
                    <div class="row">
                        <div class = "col-md-4">
                            <h3>Level : Easy</h3><br>
                            <table class = "table">
                                <thead>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Score</th>
                                </thead>
                                <tbody>
                                    <?php
                                        $query = 'SELECT name,score,level FROM score WHERE level = 0 ORDER BY score DESC';
                                        $i = 1;
                                        $sql = mysql_query($query);
                                        while($data=mysql_fetch_array($sql)){
                                            if($i==6)break;
                                            echo "<tr>";
                                            echo "<td>".$i."</td>";
                                            echo "<td>".$data["name"]."</td>";
                                            echo "<td>".$data["score"]."</td>";
                                            echo "</tr>";
                                            $i++;
                                        }
                                    ?>
                                </tbody>
                            </table>
                            <br>
                        </div>
                        <div class = "col-md-4">
                        <h3>Level : Normal</h3><br>
                            <table class = "table">
                                <thead>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Score</th>
                                </thead>
                                <tbody>
                                    <?php
                                        $query = 'SELECT name,score,level FROM score WHERE level = 1 ORDER BY score DESC';
                                        $i = 1;
                                        $sql = mysql_query($query);
                                        while($data=mysql_fetch_array($sql)){
                                            if($i==6)break;
                                            echo "<tr>";
                                            echo "<td>".$i."</td>";
                                            echo "<td>".$data["name"]."</td>";
                                            echo "<td>".$data["score"]."</td>";
                                            echo "</tr>";
                                            $i++;
                                        }
                                    ?>
                                </tbody>
                            </table>
                            <br>
                        </div>
                        <div class = "col-md-4">
                        <h3>Level : Hard</h3><br>
                            <table class = "table">
                                <thead>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Score</th>
                                </thead>
                                <tbody>
                                    <?php
                                        $query = 'SELECT name,score,level FROM score WHERE level = 2 ORDER BY score DESC';
                                        $i = 1;
                                        $sql = mysql_query($query);
                                        while($data=mysql_fetch_array($sql)){
                                            if($i==6)break;
                                            echo "<tr>";
                                            echo "<td>".$i."</td>";
                                            echo "<td>".$data["name"]."</td>";
                                            echo "<td>".$data["score"]."</td>";
                                            echo "</tr>";
                                            $i++;
                                        }
                                    ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>